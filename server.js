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

const { getUser,getAccount,updateActivity } = require('./classes/db_access.js');
const { validateActivityObject } = require('./classes/api_schema.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const twilio = require('twilio')(accountSid, authToken);
const crypto = require('crypto');
const passport = require("passport");
var initializePassport = require("./classes/passport.js");
var MongoStore = require("connect-mongo");
var bodyParser = require("body-parser");

//var passwordless = require('passwordless');
//var MongoStore = require('passwordless-mongostore-bcryptjs');

//USE

// Set Cookie Settings  


app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      store: MongoStore.create({ mongoUrl: connectionString }),
      key: "connect.sid",
      resave: false,
      saveUninitialized: true,
    })
  );


app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:19006', credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
//app.use(passwordless.sessionSupport());
//app.use(passwordless.acceptToken({ successRedirect: '/'}));
app.use(passport.initialize());
app.use(passport.session());

initializePassport(
    passport,
    (email) => users.find((user) => user.email === email),
    (id) => users.find((user) => user.id === id)
  );

//passwordless.init(new MongoStore(connectionString));








app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`); 
});


//API ENDPOINTS



//Get user account details
app.get("/User", (req, res) => {
    getUser(req.query.uid,function(data){
        res.send(data);
    });
});

//Get full account details
app.get("/Account", (req, res) => {
    getAccount(req.query.uid,function(data){
        res.send(data);
    });
});

//Add or edit activity 

app.post("/Activity/edit", (req, res) => {
    //validate inputs and create payload  UID,ACTIVITY OBJECT(date,activity_type,valid property)
    try {
       
        validateActivityObject(req.body, function(isValid){
            if(isValid){
                
                    updateActivity('12345',req.body, function(result){
                        if(result)
                            res.status(200);
                        else
                            res.status(400).json({success: false, error: 'Valid request, save error'});

                });
            }
            else
                res.status(400).json({success: false, error: 'Invalid request'});

        });
    }
    catch (err) { }

});



app.post('/sendOTP', (req, res) => {
    console.log(req.user)
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
	 res.status(200).send({ phone, hash: fullHash, otp });  // this bypass otp via api only for development instead hitting twilio api all the time
	//res.status(200).send({ phone, hash: fullHash });          // Use this way in Production
});

app.post('/verifyOTP', function (req, res, next)  {

	const phone = req.body.phone;
	const hash = req.body.hash;
	const otp = req.body.otp;

    console.log(req.user)
    console.log(req.session)

	let [ hashValue, expires ] = hash.split('.');

	let now = Date.now();
	if (now > parseInt(expires)) {
		return res.status(504).send({ msg: 'Timeout. Please try again' });
	}
	let data = `${phone}.${otp}.${expires}`;
	let newCalculatedHash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');

	if (newCalculatedHash === hashValue) {
		console.log('user confirmed');
		//do stuff


        passport.authenticate('custom', function (err, user, info) {   
            

            if (err) {
                return res.status(401).json(err);
            }
            if (user) {
                res.send(user);
            } else {
                res.status(401).json(info);
            }
        })(req, res, next)

        
       /*next();
       

       passport.authenticate("local"),
            function (req, res) {
            console.log("logged in", req.user);
            console.log(req.sessions);
            var userInfo = {
                username: req.user._id,
            };
            console.log('sending')
            res.send(userInfo);
            res.end();
            }*/


	} else {
		console.log('not authenticated');
		return res.status(400).send({ verification: false, msg: 'Incorrect OTP' });
	}
}





)

function isAuthenticated(req, res, next) {
    if (req.user) return next();
    else
      return res.status(401).json({
        error: "User not authenticated",
      });
  }

  