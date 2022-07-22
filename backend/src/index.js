
const Express = require('express');

const setupBodyparser = require('./setup/bodyparser')
const setupDatabase = require('./setup/database')
const setupRouting = require('./setup/routing')


const app = Express()

setupBodyparser(app)


async function startAll() {

    const db = await setupDatabase()
    setupRouting(app, db)

    app.listen(4000, () =>{
        console.log('Server päällä portissa 4000')
    
    })

}

startAll().catch(console.error)
