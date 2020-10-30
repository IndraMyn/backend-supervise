const { query, body, validationResult } = require('express-validator')

exports.validate = (method) => {
    switch (method) {
        case 'GetAbsen' : {
            return[
                query('id_absen').optional().notEmpty()
                .withMessage('ID Absen harus diisi!')
            ]
        }
        case 'PostAbsen' : {
            return[
                body('nip').notEmpty()
                .withMessage('NIP harus diisi!'),
                // body('tgl_absen').notEmpty()
                // .withMessage('Tanggal Absen harus diisi!'),
                // body('waktu_absen').notEmpty()
                // .withMessage('Waktu Absen harus diisi!'),
                // body('status_absen').notEmpty()
                // .withMessage('Status Absen harus diisi!'),
                // body('keterangan_absen').notEmpty()
                // .withMessage('Keterangan Absen harus diisi!')
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