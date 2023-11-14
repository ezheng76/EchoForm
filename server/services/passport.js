const passport = require('passport')
const mongoose = require('mongoose')
const keys = require('../config/keys')
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
        async (accessToken, refreshToken, profile, done) => {
            const userExist = await User.findOne({googleID: profile.id})
            
            if (userExist){
                //user already sign up once, therefore, we don't add the user again to our user collection
                //let passport know we are done and no error was found and found a user with profile.id
                return done(null, userExist)
            } 

            // this user is signing up for the first time, therefore, we save it to our user collection
            const user = await new User({ googleID: profile.id}).save()
            done(null, user)
                
            
        }
    )
)