const express = require('express')
const router = express.Router()

const validator = require('../../../Validator/PegawaiValidator')

const Response = require('../../../includes/Response')
const listRes = new Response()

const pegawaiModel = require('../../../Models/Pegawai')
const pModel = new pegawaiModel()

const Extras = require('../../../includes/Extras')
const FiltExtras = new Extras()

const Upload = require('../../../includes/Upload')

router.get('/', validator.validate('GetPegawai'), validator.verify, (req, res) => {

    try {
        const allowed = ['nip']
        var filtered = FiltExtras.filter_object(req.query, allowed)

        if (Object.keys(req.query).length > 1) {
                
            listRes.clientEntity(res, "Hanya di izinkan 1 query")

        } else {
            pModel.getData(filtered)
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

router.put('/:nip', validator.validate('PutPegawai'), validator.verify, Upload.checkFiles, Upload.Avatar, (req, res) => {
    
    try {
        var query = {
            nip: req.params.nip
        };
    
        const avatar = req.files.avatar
    
        if (avatar != null) {
            req.body.avatar = avatar.name
        }
    
        const allowed = ['nama', 'email', 'no_telp', 'alamat', 'avatar', 'tgl_lahir']
        var filtered = FiltExtras.filter_object(req.body, allowed)
        if(!Object.keys(filtered).length){
            res.status(422).send({
                message: Object.keys(req.body)+" is invalid"
            })
        }else{ 
            pModel.getData(query)
            .then(x => {
                if (x != "Empty") {
                    pModel.updateData(query, filtered)
                    .then(result => {
                        if (result) {
                            if (result == false) {
                                listRes.serverError(res)
                            } else {
                                listRes.putOk(res)
                            }
                        }
                    })
                } else {
                    listRes.clientEntity(res, "NIP tidak tersedia!")
                }
            })   
        }
    } catch (error) {
        listRes.serverError(res)
        console.log(error)
    }

})


module.exports = router;