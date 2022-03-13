require('dotenv').config()
const express = require('express'); 
const app = express();             
const PORT = process.env.PORT || 3000;
const path = require('path');
const { getUser,getAccount,updateActivity } = require('./classes/db_access.js');
const { validateActivityObject } = require('./classes/api_schema.js');

const validActivityType = ['diet','fasting','workout','alcohol'];
const validActivityFields = {'diet':['followed_diet'],'fasting':['fasted'],'workout':['worked_out'],'alcohol':['alcoholDrinksHad']}

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

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