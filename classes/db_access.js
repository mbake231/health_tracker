
const MongoPool = require('./db.js');
ObjectId = require('mongodb').ObjectId;



//Find and Return User Specific Object from DB
async function getUser (id,cb) {
    MongoPool.getInstance(function (db) {
        //	if (err) throw err;
            var dbo = db.db('User');
            console.log(id)
            dbo.collection("Users").findOne({_id: ObjectId(id)}, function(err, user) {
                if (err) throw err;
                var payload={id:user._id,
                    first:user.first,
                    last:user.last,
                    weightinDay:user.weightinDay,
                    firstDay:user.firstDay,
                    phone:user.phone,
                    email:user.email,
                    registered:user.registered
                }
                return cb(payload);
            });
        })
}


//Find and Return Full User Object from DB
async function getAccount (id,cb) {
    MongoPool.getInstance(function (db) {
        //	if (err) throw err;
            var dbo = db.db('User');
            
            dbo.collection("Users").findOne({_id:new ObjectId(id)}, function(err, user) {
                if (err) throw err;
                
                return cb(user);
            });
        })
}

//If user has validated an phone numbers update their account info
async function registerUser (user,cb) {
    MongoPool.getInstance(function (db) {
        //	if (err) throw err;
            var dbo = db.db('User');
            console.log(user)
            var newUser = {
                first:user.first,
                last:user.last,
                email:user.email,
                phone:user.phone,
                email_confirmed:false,
                testAccount:false,
                weightinDay:4,
                firstDayofWeek:0,
                registered:false,
                activity_data:{diet_data:[],fasting_data:[],workout_data:[],alcohol_data:[]}
            }
            
            dbo.collection("Users").insertOne(newUser, function(err, res) {
                if (err) throw err;
                if(res){
                        console.log('Registered:'+JSON.stringify(res)+' info:'+JSON.stringify(user));
                        return cb(true);
                }
                    
                else{
                    console.log("error saving register data")
                    return cb(false);
                }

            });
        })
}


//Looks for activites by date and if it finds one it replaces it and if its doesnt find one it adds it
async function updateActivity (_id,obj,cb) {

    MongoPool.getInstance(function (db) {
        //	if (err) throw err;
            var dbo = db.db('User');
            
            dbo.collection("Users").findOne({_id:ObjectId(_id)}, function(err, data) {
                if (err) throw err;
                var newdata = data;
                var subkey=getSubKeyActivityName(obj.activity_type);
                var updated=false;
              //  data.activity_data[subkey].forEach(function(ele,i){
                for(var i=0;i<data.activity_data[subkey].length;i++){
                  
                    if(data.activity_data[subkey][i].date===obj.date){
                        newdata.activity_data[subkey][i]=obj;
                        dbo.collection("Users").updateOne({_id:new ObjectId(data._id)},{$set:{activity_data:newdata.activity_data}});
                        updated=true;
                        i=data.activity_data[subkey].length;
                    }
                }
                    if(!updated){
                        newdata.activity_data[subkey].push(obj);
                        dbo.collection("Users").updateOne({_id:new ObjectId(data._id)},{$set:{activity_data:newdata.activity_data}});
                        updated=true;
                    }
                    if(updated){
                        return cb(true);  
                    }
                                 
            });
        })
}

function getSubKeyActivityName(at){
    if(at==='diet'){
        return "diet_data";
    }
    if(at==='workout')
        return 'workout_data'
    if(at==='fasting')
        return 'fasting_data'
    if(at=='alcohol')
        return 'alcohol_data'
    else{
        console.log('error')
        return false
    }
}

exports.getUser=getUser;
exports.getAccount=getAccount;
exports.updateActivity=updateActivity;
exports.registerUser=registerUser;

