/*import MagicLoginStrategy from "passport-magic-login"


const magicLogin = new MagicLoginStrategy({
    // Used to encrypt the authentication token. Needs to be long, unique and (duh) secret.
    secret: process.env.MAGIC_LINK_SECRET,
  
    // The authentication callback URL
    callbackUrl: "/auth/magiclogin/callback",
  
    // Called with th e generated magic link so you can send it to the user
    // "destination" is what you POST-ed from the client
    // "href" is your confirmUrl with the confirmation token,
    // for example "/auth/magiclogin/confirm?token=<longtoken>"
    sendMagicLink: async (destination, href) => {
      await sendEmail({
        to: destination,
        body: `Click this link to finish logging in: https://yourcompany.com${href}`
      })
    },
  
    // Once the user clicks on the magic link and verifies their login attempt,
    // you have to match their email to a user record in the database.
    // If it doesn't exist yet they are trying to sign up so you have to create a new one.
    // "payload" contains { "destination": "email" }
    // In standard passport fashion, call callback with the error as the first argument (if there was one)
    // and the user data as the second argument!
    verify: (payload, callback) => {
      // Get or create a user with the provided email from the database
      getOrCreateUserWithEmail(payload.destination)
        .then(user => {
          callback(null, user)
        })
        .catch(err => {
          callback(err)
        })
    }
  })
  
  // Add the passport-magic-login strategy to Passport
  passport.use(magicLogin)

*/
const bcrypt = require('bcrypt');
require('dotenv').config();
const MongoPool = require('./db.js');
const LocalStrategy = require('passport-local').Strategy;
const CustomStrategy = require('passport-custom').Strategy;

ObjectId = require('mongodb').ObjectId;


function initialize (passport, getUserByEmail, getUserById) {
  

    const authenticateUser = async (phone,done)  => {
        console.log('h1i');
                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db(dbname);
                    dbo.collection("Users").findOne({phone:phone}, async function(err, user) {
                        if (err) throw err;
                           if (user == null){
                                return done(null,false,{message: "No user with that email"})
                            }
                            try {
                               if(user) {
                                    return done(null,user)
                                }
                                else {
                                    return done(null,false,{message: 'Password incorrect'})
                                }
                            }
                            catch(e) {
                                return done(e);
                            }
                            db.close();
                    });
                  })                    
        }
        passport.use(new CustomStrategy(
            function(req, done) {
                MongoPool.getInstance(function (db,err) {
                    if (err) throw err;
                    var dbo = db.db('User');
                    dbo.collection("Users").findOne({phone:req.body.phone}, async function(err, user) {
                        if (err) throw err;
                           if (user == null){
                                return done(null,false,{message: "No user with that email"})
                            }
                            try {
                               if(user) {
                                   console.log('found user!')
                                    return done(null,user)
                                }
                                else {
                                    return done(null,false,{message: 'Password incorrect'})
                                }
                            }
                            catch(e) {
                                return done(e);
                            }
                           // db.close();
                    });
                  }) 
            }

            
          ));

          passport.serializeUser(function(user, done) {
            done(null, user._id);
        });

        passport.deserializeUser((id, done) => {
            
            //return done(null, function (id) {
                MongoPool.getInstance(function (db,err) {
                    if (err) throw err;
                    var dbo = db.db('User');
                    dbo.collection("Users").findOne({"_id":ObjectId(id)}, function(err, result) {
                      if (err) throw err;
                      console.log("Successfully deserailized:"+result._id);

                      return done(null,result);
                    });
                  })

            //})
        })

       

    
    }
module.exports = initialize