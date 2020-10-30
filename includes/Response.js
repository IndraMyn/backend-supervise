class Response {

    getOk = (res, value, message) => {
        
        const data = {
            data : value,
            message : (message == null || message == undefined)? "Successfully" : message
        }
        
        res.status(200).send(data)
        res.end()
    }

    postOk = (res, message) => {
        const data = {
            message : (message == null || message == undefined)? "Successfully" : message
        }
        
        res.status(201).send(data)
        res.end()
    }

    putOk = (res, message) => {
        const data = {
            message : (message == null || message == undefined)? "Successfully" : message
        }
        
        res.status(201).send(data)
        res.end()
    }

    deleteOk = (res, message) => {
        const data = {
            message : (message == null || message == undefined)? "Successfully" : message
        }
        
        res.status(201).send(data)
        res.end()
    }
    clientEntity = (res, message) => {
        const data = {
            message : (message == null || message == undefined)? "Unprocessable Entity" : message
        }

        res.status(422).send(data)
    }
    clientError = (res, message) => {
        const data = {
            message : (message == null || message == undefined)? "Bad Request" : message
        }

        res.status(400).send(data)
    }

    serverError = (res, message) => {
        const data = {
            message : (message == null || message == undefined)? "Internal Server Error" : message
        }

        res.status(500).send(data)
    }
}

module.exports = Response