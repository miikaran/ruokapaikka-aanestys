const Mongodb = require('mongodb');

const uri = 'mongodb://localhost/aanestys_ruokapaikka'

module.exports = async () => {

    const client = new Mongodb.MongoClient(uri)

    await client.connect()

    return client.db()

}