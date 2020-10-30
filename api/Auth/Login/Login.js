const express = require('express')
const router = express.Router()
const Database = require('../../../includes/Database')
const auth = require('../Auth')

const crypto = require('crypto')

const Response = require('../../../includes/Response')
const listRes = new Response()

const validator = require('../../../Validator/LoginValidator')

router.post("/", validator.validate('PostLogin'), validator.verify, (req, res) => {
    const password = crypto.createHash('sha1').update(req.body.password).digest('hex')
    Database.query(`SELECT * FROM akun WHERE nip = '${req.body.nip}'`, (error, rows, column) => {
        if (error) {
            res.send({error : true})
        } else {
            if (rows.length <= 0) {
                listRes.clientError(res, 'NIP atau Password Salah')
            } 
            else if (rows[0].password === password) {
                const token = auth.generateToken({nip: rows[0].nip,nama: rows[0].nama, tipe_data: rows[0].level})
                listRes.getOk(res, token)
            } else {
                listRes.clientError(res, "NIP atau Password Salah!")
            }
        }
    })
})

module.exports = router;