const express = require('express')
const router = express.Router()

const validator = require('../../../Validator/AbsenValidator')

const Response = require('../../../includes/Response')
const listRes = new Response()

const AbsenModel = require('../../../Models/Absen')
const abModel = new AbsenModel()

const Extras = require('../../../includes/Extras')
const FiltExtras = new Extras()

router.get('/', validator.validate('GetAbsen'), validator.verify, (req, res) => {

    try {
        const allowed = ['id_absen', 'status_absen', 'keterangan_absen']

        if (Object.keys(req.query).length > 1) {
                
            listRes.clientEntity(res, "Hanya di izinkan 1 query")

        } else {

            var filtered = FiltExtras.filter_object(req.query, allowed)
            abModel.getData(filtered)
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