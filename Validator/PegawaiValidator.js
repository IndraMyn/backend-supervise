const { query, body, param, validationResult } = require('express-validator')

exports.validate = (method) => {
    switch (method) {
        case 'GetPegawai' : {
            return[
                query('nip').optional().notEmpty()
                .withMessage('ID Pegawai harus diisi!')
            ]
        }
        case 'GetPegawai2' : {
            return[
                param('nip').optional().notEmpty()
                .withMessage('Harus mengirim NIP!')
            ]
        }
        case 'PostPegawai' : {
            return[
                body('nip').notEmpty()
                .withMessage('NIP harus diinput!'),
                body('nama').notEmpty()
                .withMessage('Nama harus diinput!'),
                body('email').notEmpty()
                .withMessage('Email harus diinput!'),
                body('no_telp').notEmpty()
                .withMessage('No Telp harus diinput!'),
                body('alamat').notEmpty()
                .withMessage('Alamat harus diinput!'),
                body('avatar').optional().notEmpty()
                .withMessage('Avatar harus diinput!'),
                body('tgl_lahir').notEmpty()
                .withMessage('Tgl Lahir harus diinput!')
            ]
        }
        case 'PutPegawai' : {
            return[
                param('nip').notEmpty()
                .withMessage('Harus mengirim NIP!'),
                body('nama').optional().notEmpty()
                .withMessage('Nama harus diinput!'),
                body('email').optional().notEmpty()
                .withMessage('Email harus diinput!'),
                body('no_telp').optional().notEmpty()
                .withMessage('No Telp harus diinput!'),
                body('alamat').optional().notEmpty()
                .withMessage('Alamat harus diinput!'),
                body('avatar').optional().notEmpty()
                .withMessage('Avatar harus diinput!'),
                body('tgl_lahir').optional().notEmpty()
                .withMessage('Tgl Lahir harus diinput!')
            ]
        }
        case 'DeletePegawai' : {
            return[
                param('nip').notEmpty()
                .withMessage('Harus mengirim NIP!')
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