const Mongodb = require('mongodb');

const uri = 'mongodb://localhost/aanestys_ruokapaikka'

module.exports = () => {

    const client = new Mongodb.MongoClient(uri)

    return client.connect()

}