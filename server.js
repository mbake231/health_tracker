require('dotenv').config()
//ENV
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const smsKey = process.env.SMS_SECRET_KEY;
const twilioNum = process.env.TWILIO_PHONE_NUMBER;
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;

//DB
var username = process.env.MONGO_USERNAME;
var password = process.env.MONGO_PASSWORD;
var hosts = process.env.MONGO_HOSTS;
var database = 'User';
var options = '?replicaSet=cd62217d77f7454da70432512d1d9507';
var connectionString = 'mongodb://' + username + ':' + password + '@' + hosts + '/' + database + options;

const cors = require('cors');
const express = require('express');
const app = express();
var session = require("express-session");
const PORT = process.env.PORT || 3000;
const path = require('path');

const {
    getUser,
    getAccount,
    updateActivity,
    registerUser
} = require('./classes/db_access.js');
const {
    validateActivityObject,validateRegisterObject
} = require('./classes/api_schema.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// const twilio = require('twilio')(accountSid, authToken);
const crypto = require('crypto');
const passport = require("passport");
var initializePassport = require("./classes/passport.js");
var MongoStore = require("connect-mongo");
var bodyParser = require("body-parser");

//USE
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        store: MongoStore.create({
            mongoUrl: connectionString
        }),
        key: "connect.sid",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:19006',
    credentials: true
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

initializePassport(
    passport,
    (email) => users.find((user) => user.email === email),
    (id) => users.find((user) => user.id === id)
);

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});


//API ENDPOINTS
function isAuthenticated(req, res, next) {
    if (req.user) return next();
    else
      return res.status(401).json({
        error: "User not authenticated",
      });
  }

//Get user account details
app.get("/User", (req, res) => {
    if(req.user)
        getUser(req.user._id, function (data) {
            res.send(data);
        });
    
    else
        res.status(401).json({
            error: "User not authenticated",
        });
});

app.post("/register", (req, res) => {
    //ensure not registered
    // if(!req?.user?.registered)
        validateRegisterObject(req.body,function(isValid){
            if(isValid){
                var payload=req.body;
                payload['phone']=req.user.phone;
                payload['_id']=req.user._id;

                registerUser(payload, function(done){
                    if(done){
                        console.log('registering:'+JSON.stringify(payload));
                        res.status(200).json({message:'User registered'});
                    }
                    else{
                        console.log('error registering')
                        res.status(401).json({
                            error: "Error registering",
                        });
                    }
                });
            }
            else{
                console.log("something went wrong in registering");
                res.status(401).json({
                    error: "User is eligible but invalid register request",
                });
            }

        })
    
    // else if(req.user.registered) {
    //     console.log("already registered!");
    //     res.status(401).json({
    //         error: "User already registered",
    //     });
    // }
    // else
    //     res.status(401).json({
    //         error: "User not authenticated",
    //     });
});

//Get full account details
app.get("/Account", (req, res) => {
    if(req.user.registered)
        getAccount(req.user._id, function (data) {
            res.send(data);
        });
    else if (req.user && !req.user.registered) {
        //if !registered just send user so FE knows to register
        getUser(req.user._id, function (data) {
            res.send(data);
        });
    }
    else
        res.status(401).json({
            error: "User not authenticated",
        });
});

//Add or edit activity 
app.post("/Activity/edit", (req, res) => {
    //validate inputs and create payload  UID,ACTIVITY OBJECT(date,activity_type,valid property)
    console.log(req.user._id)
    if(req.user)
    try {
        validateActivityObject(req.body, function (isValid) {
            if (isValid) {
                updateActivity(req.user._id, req.body, function (result) {
                    if (result)
                        res.status(200);
                    else
                        res.status(400).json({
                            success: false,
                            error: 'Valid request, save error'
                        });
                });
            } else
                res.status(400).json({
                    success: false,
                    error: 'Invalid request'
                });

        });
    } catch (err) {}

    else
        res.status(401).json({
            error: "User not authenticated",
        });

});

app.post('/sendOTP', (req, res) => {
    console.log('yas req', req)
    const phone = req.body.phone;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const ttl = 2 * 60 * 1000;
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
    const fullHash = `${hash}.${expires}`;
    /*
    	twilio.messages
    		.create({
    			body: `Your One Time Login Password For CFM is ${otp}`,
    			from: twilioNum,
    			to: phone
    		})
    		.then((messages) => console.log(messages))
    		.catch((err) => console.error(err));
    */
    res.status(200).send({
        phone,
        hash: fullHash,
        otp
    }); // this bypass otp via api only for development instead hitting twilio api all the time
    //res.status(200).send({ phone, hash: fullHash });          // Use this way in Production
});

app.post('/verifyOTP', function (req, res, next) {
        const phone = req.body.phone;
        const hash = req.body.hash;
        const otp = req.body.otp;

        let [hashValue, expires] = hash.split('.');

        let now = Date.now();
        if (now > parseInt(expires)) {
            return res.status(504).send({
                msg: 'Timeout. Please try again'
            });
        }
        let data = `${phone}.${otp}.${expires}`;
        let newCalculatedHash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');

        if (newCalculatedHash === hashValue) {
            console.log('valid phone number confirmed');
            passport.authenticate('custom', function (err, user, info) {
                if (err) {
                    return res.status(401).json(err);
                }
                if (user) {
                    req.login(user, function (err) { 
                        if (err) {
                            return res.status(401).json(err);
                        } else {
                            res.status(200).json(user);
                        }
                    });
                } else {
                    res.status(401).json(info);
                  //  res.redirect('your/404/path.html');

                }
            })(req, res, next)
        } else {
            console.log('not authenticated');
            return res.status(400).send({
                verification: false,
                msg: 'Incorrect OTP'
            });
        }
    }
)
