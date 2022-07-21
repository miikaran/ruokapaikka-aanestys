module.exports = (client) => {

    return(request, response) => {

        console.log(client)

        response.json({
            
            message: 'toimii'
        })

    }
    
}