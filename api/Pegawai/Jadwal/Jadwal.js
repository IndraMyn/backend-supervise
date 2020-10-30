const express = require('express')
const router = express.Router()

const validator = require('../../../Validator/JadwalValidator')

const Response = require('../../../includes/Response')
const listRes = new Response()

const jadwalModel = require('../../../Models/Jadwal')
const jModel = new jadwalModel()

const Extras = require('../../../includes/Extras')
const FiltExtras = new Extras()

router.get('/', validator.validate('GetJadwal'), validator.verify, (req, res) => {
    const allowed = ['id_jadwal', 'hari', 'mulai', 'selesai', 'keterangan_jadwal']
    var filtered = FiltExtras.filter_object(req.query, allowed)
    if (Object.keys(req.query).length > 1) {
        listRes.clientEntity(res, "Hanya di izinkan 1 query")
    } else {
        jModel.getData(filtered)
        .then(result => {
            if (result == false) {
                listRes.serverError(res)
            } else {
                listRes.getOk(res, result)
            }
        })
    }
})

module.exports = router