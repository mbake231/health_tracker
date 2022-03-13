
const MongoPool = require('./db.js');
ObjectId = require('mongodb').ObjectId;



//Find and Return User Specific Object from DB
async function getUser (uid,cb) {
    MongoPool.getInstance(function (db) {
        //	if (err) throw err;
            var dbo = db.db('User');
            
            dbo.collection("Users").findOne({uid:uid}, function(err, user) {
                if (err) throw err;
                var payload={uid:user.uid,
                    first:user.first,
                    last:user.last,
                    weightinDay:user.weightinDay,
                    firstDay:user.firstDay,
                    phone:user.phone,
                    email:user.email
                }
                return cb(payload);
            });
        })
}


//Find and Return Full User Object from DB
async function getAccount (uid,cb) {
    MongoPool.getInstance(function (db) {
        //	if (err) throw err;
            var dbo = db.db('User');
            
            dbo.collection("Users").findOne({uid:uid}, function(err, user) {
                if (err) throw err;
                
                return cb(user);
            });
        })
}
//Looks for activites by date and if it finds one it replaces it and if its doesnt find one it adds it
async function updateActivity (uid,obj,cb) {

    MongoPool.getInstance(function (db) {
        //	if (err) throw err;
            var dbo = db.db('User');
            
            dbo.collection("Users").findOne({uid:uid}, function(err, data) {
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
                        update=true;
                    }
                    if(updated)
                        return cb(true);
             
                 
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

