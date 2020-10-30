const { query, body, param, validationResult } = require('express-validator')

exports.validate = (method) => {
    switch (method) {
        case 'GetJadwal':{
            return [
                query('id_jadwal').optional()
            ]
        }
        case 'PostJadwal':{
            return [
                body('hari').notEmpty()
                .withMessage('Hari harus diisi!'),
                body('mulai').notEmpty()
                .withMessage('Mulai harus diisi!'),
                body('selesai').notEmpty()
                .withMessage('Selesai harus diisi!'),
                body('keterangan_jadwal').notEmpty()
                .withMessage('Keterangan jadwal harus diisi!'),
            ]
        }
        break;
        case 'PutJadwal':{
            return [
                query('id_jadwal').notEmpty()
                .withMessage('Id Jadwal harus diisi!'),
            ]
        }
        break;
        case 'DeleteAkun':{
            return [
                query('id_jadwal').notEmpty()
                .withMessage('Id Jadwal harus diisi!')
            ]
        }
        break;
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