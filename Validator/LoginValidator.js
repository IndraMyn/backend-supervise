const { query, body, param, validationResult } = require('express-validator')

exports.validate = (method) => {
    switch (method) {
        case 'PostLogin' : {
            return[
                body('nip').notEmpty()
                .withMessage('NIP tidak boleh kosong!'),
                body('password').notEmpty()
                .withMessage('Password tidak boleh kososng!')
            ]
        }        
    }
}

exports.verify = (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(422).json({
                errors: errors.array()
            })
            return;
        } else {
            return next();
        }
    } catch (err) {
        return next(err)
    }
}