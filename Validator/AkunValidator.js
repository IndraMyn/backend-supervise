const { query, body, param, validationResult } = require('express-validator')

exports.validate = (method) => {
    switch (method) {      
        case 'GetAkun' : {
            return[
                query('nip').optional().notEmpty()
                .withMessage('NIP harus diisi!'),
                query('id_akun').optional().notEmpty()
                .withMessage('ID Akun harus diisi!')
            ]
        }
        case 'PutAkun' : {
            return[
                param('nip').notEmpty()
                .withMessage('Harus mengirim NIP!'),
                body('password').optional().notEmpty()
                .withMessage('Password harus diinput!'),
            ]
        }
        case 'PostAkun' : {
            return[
                body('nip').notEmpty()
                .withMessage('NIP harus diisi!'),
                body('password').notEmpty()
                .withMessage('Password harus diisi!'),
                body('level').notEmpty()
                .withMessage('Level harus diisi!')
            ]
        }
        case 'DeleteAkun' : {
            return[
                param('nip').notEmpty()
                .withMessage('Harus mengirim NIP')
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