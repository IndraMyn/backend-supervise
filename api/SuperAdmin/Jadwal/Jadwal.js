const express = require('express')
const router = express.Router()

var validator = require('../../../Validator/JadwalValidator')

const Response = require('../../../includes/Response')
const listRes = new Response()

const jadwalModel = require('../../../Models/Jadwal')
const jModel = new jadwalModel()

const Extras = require('../../../includes/Extras')
const FiltExtras = new Extras()

router.get('/', validator.validate('GetJadwal'), validator.verify, (req, res) => {
    const allowed = ['id_jadwal', 'hari', 'mulai', 'selesai', 'keterangan_jadwal']
    var filtered = FiltExtras.filter_object(req.query, allowed)
    jModel.getData(filtered)
    .then(result => {
        if (result == false) {
            listRes.serverError(res)
        } else {
            listRes.getOk(res, result)
        }
    })
})

router.post('/', validator.validate('PostJadwal'), validator.verify, (req, res) => {
    const allowed = ['id_jadwal', 'hari', 'mulai', 'selesai', 'keterangan_jadwal']
    var filtered = FiltExtras.filter_object(req.body, allowed)
    jModel.insertData(filtered)
    .then(result => {
        if (result) {
            if (result == false) {
                listRes.serverError(res)
            } else {
                listRes.postOk(res)
            }
        }
    })

})

router.put('/:id_jadwal', validator.validate('PutJadwal'), validator.verify, (req, res) => {
    var query = {
        id_jadwal : req.params.id_jadwal
    }
    const allowed = ['id_jadwal', 'hari', 'mulai', 'selesai', 'keterangan_jadwal']
    var filtered = FiltExtras.filter_object(req.body, allowed)
    if(!Object.keys(filtered).length){
        res.status(422).send({
            message: Object.keys(req.body)+" is invalid"
        })
      }else{
    jModel.updateData(query, filtered)
    .then(result => {
        if (result) {
            if (result == false) {
                listRes.serverError(res)
            } else {
                listRes.putOk(res)
            }
        }
    })
}
})


router.delete('/:id_jadwal', (req, res) => {
    var query = {
        id_jadwal : req.params.id_jadwal
    }
    jModel.deleteData(query)
    .then(result => {
        if (result) {
            if (result == false) {
                listRes.serverError(res)
            } else {
                listRes.deleteOk(res)
            }
        }
    })

})

module.exports = router