const { query, body, param, validationResult } = require('express-validator')

exports.validate = (method) => {
    switch (method) {
        case 'GetKegiatan' : {
            return[
                query('id_kegiatan').optional().notEmpty()
                .withMessage('ID Kegiatan harus diisi!')
            ]
        }
        case 'PostKegiatan' : {
            return[
                body('nip').notEmpty()
                .withMessage('NIP harus diisi!'),
                body('kegiatan').notEmpty()
                .withMessage('Kegiatan harus diisi!'),
                // body('foto_kegiatan').notEmpty()
                // .withMessage('Foto Kegiatan harus diinput!'),
                // body('file_kegiatan').notEmpty()
                // .withMessage('File Kegiatan harus diinput!'),
                body('tgl_kegiatan').notEmpty()
                .withMessage('Tgl Kegiatan harus diisi!'),
                body('waktu_kegiatan').notEmpty()
                .withMessage('Waktu Kegiatan harus diisi!')
            ]
        }
        case 'PutKegiatan' : {
            return[
                param('id_kegiatan').notEmpty()
                .withMessage('Harus mengirim ID Kegiatan'),
                body('kegiatan').optional().notEmpty()
                .withMessage('Kegiatan harus diisi!'),
                body('foto_kegiatan').optional().notEmpty()
                .withMessage('Foto Kegiatan harus diinput!'),
                body('file_kegiatan').optional().notEmpty()
                .withMessage('File Kegiatan harus diinput!'),
                body('tgl_kegiatan').optional().notEmpty()
                .withMessage('Tgl Kegiatan harus diisi!'),
                body('waktu_kegiatan').optional().notEmpty()
                .withMessage('Waktu Kegiatan harus diisi!')
            ]
        }
        case 'DeleteKegiatan' : {
            return[
                param('id_kegiatan').notEmpty()
                .withMessage('Harus mengirim ID Kegiatan')
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