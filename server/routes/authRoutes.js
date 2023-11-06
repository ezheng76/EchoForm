const passport = require('passport')

module.exports = (app) => {
    //first time users authenticate with google
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'] //what we are asking to get access to from google when user sign in
        })
    )
    
    //not first time authorizing
    //we get the code google gave back, and turn the code into a profile 
    app.get(
        '/auth/google/callback',
        passport.authenticate('google')
    )

    app.get('/api/logout', (req, res) => {
        req.logout()
        res.send(req.user)
    })
    app.get('/api/curr_user', (req, res) => {
        res.send(req.user)
    })
}
