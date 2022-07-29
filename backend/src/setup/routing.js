
const Router = require('express').Router

const createPolls = require('../handlers/createpolls')
const createVotes = require('../handlers/createvotes')
const getPoll = require('../handlers/getpoll')
const createPollsValidator = require('../datavalidate/ValidatePolls')
const createVotesValidator = require('../datavalidate/ValidateVotes')


module.exports = (app, db) => {

    const router = new Router()

    router.post('/aanestykset', createPollsValidator, createPolls(db))
    router.put('/aanestykset/:poll', createVotesValidator, createVotes(db))
    router.get('/aanestykset/:poll', getPoll(db))

    app.use(router)
    
} 