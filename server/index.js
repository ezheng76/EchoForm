const express = require('express')
const passport = require('passport')
const keys = require('../config/keys')
const googleStrategy = require('passport-google-oauth20').Strategy

const app = express()

passport.use(
    new googleStrategy(
        {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
        }, 
        (accessToken) => {
            console.log(accessToken)
        }
    )
)

app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
)


const PORT = process.env.PORT || 4001
app.listen(PORT)