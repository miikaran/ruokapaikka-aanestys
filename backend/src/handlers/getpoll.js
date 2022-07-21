
module.exports = (db) => {

    return async (request, response) => {

        const poll = await db.collection('aanestykset').findOne({

            _id: request.params.poll
        })

        return response.json(poll)
    }
}