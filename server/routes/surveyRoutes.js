const { URL } = require('url')
const _ = require('lodash')
const { Path } = require('path-parser')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
const mongoose = require('mongoose')
const path = require('path')

const Survey = mongoose.model('surveys')

module.exports = app => {

    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id})
            .select({ recipients: false})

        res.send(surveys)
    })

    app.get('/api/surveys/:surveyID/:choice', (req, res) => {
        res.send('Thank you for your feedback')
    })

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyID/:choice')

        //look through each events send from sendGrid, and extract only the email, surveyId and choice made by user
        const events = _.map(req.body, event => {
            const pathname = new URL(event.url).pathname

            const match = p.test(pathname)

            if (match){
                return {email: event.email, surveyID: match.surveyID, choice: match.choice}
            }
        })

        //this will remove all the undefined objects in the array
        const compactEvents = _.compact(events)

        //this will remove the duplicate responses in compactEvents by looking at duplicate email and surveyID
        const uniqueEvents = _.unionBy(compactEvents, 'email', 'surveyID')

        //for each unique events, we will find the response in the mongo data base and update the choice count and change responded to true
        uniqueEvents.forEach( event => {
            Survey.updateOne(
                //find the recipient that matches the properties of surveyID, email and response
                {
                    _id: event.surveyID,
                    recipients: {
                        $elemMatch: { email: event.email, responded: false}
                    }
                }, 
                //once we find a match, update the choice count and set responded to true
                {
                    $inc: { [event.choice]: 1},
                    $set: { 'recipients.$.responded': true},
                    lasResponded: new Date()
                }
            ).exec()
        })

        
        res.send({})
    })

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const {title, body, subject, recipients} = req.body

        const survey = new Survey({
            title: title,
            body: body,
            subject: subject,
            recipients: recipients.split(',').map(email => ({email: email.trim()})),
            dateSent: Date.now(),
            _user: req.user.id
        })

        const mailer = new Mailer(survey, surveyTemplate(survey))

        try {
            await mailer.send()
            await survey.save()
            req.user.credits -= 1
            const user = await req.user.save()
    
            res.send(user)
        } catch (err) {
            res.status(422).send(err)
        }
        

    })
}