const {v4} = require('uuid')

module.exports = (db) => {

    return async(request, response) => {

        //ÄÄNESTYKSISSÄ KÄYTETTY DATA//
        const data = {

            _id: v4(),
            title: request.body.title,
            choices: request.body.choices.map(choice => ({
                
                name: choice,
                count: 0,
                _id: v4()

           }))
        }

        await db.collection('aanestykset').insertOne(data)

        return response.json({

            message: 'Äänestys luotu',
            pollId: data._id,
            data
        })
    }
}