var MongoClient = require('mongodb').MongoClient;

var username = process.env.MONGO_USERNAME;
var password = process.env.MONGO_PASSWORD;
var hosts = process.env.MONGO_HOSTS;
var database = 'User';
var options = '?replicaSet=cd62217d77f7454da70432512d1d9507';
var connectionString = 'mongodb://' + username + ':' + password + '@' + hosts + '/' + database + options;

var option = {
    db:{
      numberOfRetries : 5
    },
    server: {
      auto_reconnect: true,
      poolSize : 40,
      socketOptions: {
          connectTimeoutMS: 500
      }
    },
    replSet: {},
    mongos: {}
  };
  
  function MongoPool(){}
  
  var p_db;
  
  function initPool(cb){
    MongoClient.connect(connectionString, {useUnifiedTopology: true,useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
  
      p_db = db;
      if(cb && typeof(cb) == 'function')
          cb(p_db);
    });
    return MongoPool;
  }
  
  MongoPool.initPool = initPool;
  
  function getInstance(cb){
    if(!p_db){
      initPool(cb)
    }
    else{
      if(cb && typeof(cb) == 'function')
        cb(p_db);
    }
  }
  MongoPool.getInstance = getInstance;
  
  module.exports = MongoPool;