const Express = require('express');
const setupBodyparser = require('./setup/bodyparser')
const setupDatabase = require('./setup/database')
const setupRouting = require('./setup/routing')

const app = Express()

setupBodyparser(app)


setupDatabase()

    .then((client) =>{

        setupRouting(app, client)
       
        app.listen(4000, () =>{
            console.log('Server päällä portissa 4000')
        
        })
    })

    .catch(console.error)
