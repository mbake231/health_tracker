require('dotenv').config()
const express = require('express'); 
const app = express();             
const PORT = process.env.PORT || 3000;
const path = require('path');
const { getUser,getAccount } = require('./classes/db_access');

app.use(express.static(path.join(__dirname, 'client/build')));

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

//Get user calendar
app.get("/User/calendar", (req, res) => {
    getUserCalendar(req.query.uid,function(user){
        res.send(user);
    });
});