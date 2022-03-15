const bcrypt = require('bcrypt');
require('dotenv').config();
const MongoPool = require('./db.js');
const LocalStrategy = require('passport-local').Strategy;
const CustomStrategy = require('passport-custom').Strategy;

ObjectId = require('mongodb').ObjectId;

function initialize(passport, getUserByEmail, getUserById) {
    passport.use(new CustomStrategy(
        function (req, done) {
            MongoPool.getInstance(function (db, err) {
                if (err) throw err;
                var dbo = db.db('User');
                dbo.collection("Users").findOne({
                    phone: req.body.phone
                }, async function (err, user) {
                    if (err) throw err;
                    if (user == null) {
                        return done(null, false, {
                            message: "No user with that email"
                        })
                    }
                    try {
                        if (user) {
                            console.log('found user!')

                            return done(null, user)
                        } else {
                            return done(null, false, {
                                message: 'Password incorrect'
                            })
                        }
                    } catch (e) {
                        return done(e);
                    }
                });
            })
        }
    ));
    passport.serializeUser(function (user, done) {
        console.log('serializing!')
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {

        //return done(null, function (id) {

        MongoPool.getInstance(function (db, err) {
            if (err) throw err;
            var dbo = db.db('User');
            dbo.collection("Users").findOne({
                "_id": ObjectId(id)
            }, function (err, result) {
                if (err) throw err;
                console.log("Successfully deserailized:" + result._id);

                return done(null, result);
            });
        })
    })
}
module.exports = initialize