const express = require('express')
const router = express.Router()

const validator = require('../../../Validator/KegiatanValidator')

const Response = require('../../../includes/Response')
const listRes = new Response()

const taskModel = require('../../../Models/Kegiatan')
const tModel = new taskModel()

const Extras = require('../../../includes/Extras')
const FiltExtras = new Extras()

router.get('/',  validator.validate('GetKegiatan'), validator.verify, (req, res) => {
    try {
        const allowed = ['id_kegiatan', 'nip']
        var filtered = FiltExtras.filter_object(req.query, allowed)
        if (Object.keys(req.query).length > 1) {
            listRes.clientEntity(res, "Hanya di izinkan 1 query")
        } else {
            tModel.getData(filtered)
            .then(result => {
                if (result == false) {
                    listRes.serverError(res)
                } else {
                    listRes.getOk(res, result)
                }
            })
        }
    } catch (error) {
        listRes.serverError(res)
        console.log(error)
    }
})


module.exports = router