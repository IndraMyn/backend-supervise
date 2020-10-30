exports.Cors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    if (res.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'
        )
        return res.status(200).json({})
    }
    next()
}