
const Router = require('express').Router
const luoAanestykset = require('../handlers/LuoAanestykset')


module.exports = (app, client) => {

    const router = new Router()

    router.post('/aanestykset', luoAanestykset(client))

    app.use(router)
    
} 