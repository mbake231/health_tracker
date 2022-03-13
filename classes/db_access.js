
const MongoPool = require('./db.js');



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

exports.getUser=getUser;
exports.getAccount=getAccount;
