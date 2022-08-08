module.exports = (db) => {

    return async(request, response) => {

        //VALITUT VASTAUKSET//
        const result = await db.collection('aanestykset').updateOne({
            _id: request.params.poll,
            'choices._id': request.body.choice
        }, {

            $inc: {
                'choices.$.count': 1,
            }
        })
        console.log(result)

        return response.json({
            message: 'Äänesi on lisätty'
        })

    }
}