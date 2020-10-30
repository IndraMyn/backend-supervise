const express = require('express')
const router = express.Router()

const validator = require('../../../Validator/KegiatanValidator')

const Response = require('../../../includes/Response')
const listRes = new Response()

const taskModel = require('../../../Models/Kegiatan')
const tModel = new taskModel()

const Extras = require('../../../includes/Extras')
const FiltExtras = new Extras()

const Upload = require('../../../includes/Upload')

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

router.post('/', validator.validate('PostKegiatan'), validator.verify, Upload.checkFiles,Upload.File, Upload.Foto, (req, res) => {
    
    try {
        const foto = req.files.foto_kegiatan
        const file = req.files.file_kegiatan

        req.body.foto_kegiatan = (foto == null) ? null : foto.name
        req.body.file_kegiatan = (file == null) ? null : file.name

        const allowed = ['id_kegiatan', 'nip', 'kegiatan', 'foto_kegiatan', 'file_kegiatan', 'tgl_kegiatan', 'waktu_kegiatan']

        if (foto == null && file == null) {
            listRes.clientError(res, "Foto dan File harus ada salah satu!")
            console.log(req.files)
        } else {
            var filtered = FiltExtras.filter_object(req.body, allowed)
            tModel.insertData(filtered)
            .then(result => {
                if (result) {
                    if (result == false) {
                        listRes.serverError(res)
                    } else {
                        listRes.postOk(res)
                    }
                }
            })
        }
        
    } catch (error) {
        listRes.serverError(res)
        console.log(error)
    }
})

router.put('/:id_kegiatan', validator.validate('PutKegiatan'), validator.verify, Upload.checkFiles,Upload.File, Upload.Foto,(req, res) => {
    try {
        
        var query = {
            id_kegiatan: req.params.id_kegiatan
        };

        const foto = req.files.foto_kegiatan
        const file = req.files.file_kegiatan

        if (foto != null && file != null) {
            req.body.foto_kegiatan = foto.name
            req.body.file_kegiatan = file.name
        } else if (foto != null) {
            req.body.foto_kegiatan = foto.name
        } else if (file != null) {
            req.body.file_kegiatan = file.name
        }
        
        const allowed = ['id_kegiatan', 'nip', 'kegiatan', 'foto_kegiatan', 'file_kegiatan', 'tgl_kegiatan', 'waktu_kegiatan']
        var filtered = FiltExtras.filter_object(req.body, allowed)
        if (Object.keys(req.body).length <= 0) {

            listRes.clientEntity(res, "Minimal ada satu body")

        } else if (!Object.keys(filtered).length) {
            
            listRes.clientEntity(res, Object.keys(req.body)+" is invalid")

        } else { 

            tModel.updateData(query, filtered)
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
    } catch (error) {
        listRes.serverError(res)
        console.log(error)
    }
})



router.delete('/:id_kegiatan', (req, res) => {
    try {
        var query = {
            id_kegiatan : req.params.id_kegiatan
        }
        tModel.deleteData(query)
        .then(result => {
            if (result) {
                if (result == false) {
                    listRes.serverError(res)
                } else {
                    listRes.deleteOk(res)
                }
            }
        })
    } catch (error) {
        listRes.serverError(res)
        console.log(error)
    }

})

module.exports = router