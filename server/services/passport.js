const passport = require('passport')
const mongoose = require('mongoose')
const keys = require('../config/prod')
const googleStrategy = require('passport-google-oauth20').Strategy

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((ID, done) => {
    User.findById(ID).then((user) => {
        done(null, user)
    })
})

passport.use(
    new googleStrategy(
        {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
        }, 
        (accessToken, refreshToken, profile, done) => {
            User.findOne({googleID: profile.id}).then ((userExist) => {
                if (userExist){
                    //user already sign up once, therefore, we don't add the user again to our user collection
                    //let passport know we are done and no error was found and found a user with profile.id
                    done(null, userExist)
                } else {
                    // this user is signing up for the first time, therefore, we save it to our user collection
                    new User({ googleID: profile.id}).save().then((user) => {
                        done(null, user)
                    })
                }
            })
        }
    )
)