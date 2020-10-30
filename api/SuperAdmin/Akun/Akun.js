const express = require('express')
const router = express.Router()

const Response = require('../../../includes/Response')
const listRes = new Response()

const akunModel = require('../../../Models/Akun')
const aModel = new akunModel()

const pegawaiModel = require('../../../Models/Pegawai')
const pModel = new pegawaiModel()

const Extras = require('../../../includes/Extras')
const FiltExtras = new Extras()

const validator = require('../../../Validator/AkunValidator')

const crypto = require('crypto')

router.get('/', validator.validate("GetAkun"), validator.verify, (req, res) => {
    
    try {

        const allowed = ['id_akun', 'nip']

        if (Object.keys(req.query).length > 1) {
            
            listRes.clientEntity(res, "Hanya di izinkan 1 query")

        } else {

            var filtered = FiltExtras.filter_object(req.query, allowed)
            aModel.getData(filtered)
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

router.put('/:nip', validator.validate("PutAkun"), validator.verify, (req, res) => {

    try {
        var query = {
            nip: req.params.nip
        };
    
        const allowed = ['password']
    
        if (req.body.password != undefined) {
            req.body.password = crypto.createHash('sha1').update(req.body.password).digest('hex')
        }
    
        var filtered = FiltExtras.filter_object(req.body, allowed)
        
        aModel.getData(query)
        .then(x => {
            if (x != "Empty") {
                if (Object.keys(req.body).length <= 0) {
    
                    listRes.clientEntity(res, "Minimal ada satu body")
            
                } else if (!Object.keys(filtered).length) {
                    
                    listRes.clientEntity(res, Object.keys(req.body)+" is invalid")
            
                } else { 
            
                    aModel.updateData(query, filtered)
                    .then(result => {
                        if (result == false) {
                            listRes.serverError(res)
                        } else {
                            listRes.putOk(res)
                        }
                    })
            
                }
            } else {
                listRes.clientEntity(res, "NIP tidak tersedia!")
            }
        })
        
    } catch (error) {
        listRes.serverError(res)
        console.log(error)
    }

})

router.post('/', validator.validate("PostAkun"), validator.verify, (req, res) => {

    try {
        const allowed = ['nip','password','level']
        var filtered = FiltExtras.filter_object(req.body, allowed)

        pModel.getData({nip : req.body.nip})
        .then(x => {
            if (x != "Empty") {
                aModel.getData({nip: req.body.nip})
                .then(x => {
                    if (x == "Empty") {
                        aModel.insertData(filtered)
                        .then(result => {
                            if (result) {
                                if (result == false) {
                                    listRes.serverError(res)
                                } else {
                                    listRes.postOk(res)
                                }
                            }
                        })
                    } else {
                        listRes.clientEntity(res, "Akun dengan NIP tersebut sudah tersedia!")
                    }
                })
            } else {
                listRes.clientEntity(res, "NIP tidak tersedia!")
            }
        })
    } catch (error) {
        listRes.serverError(res)
        console.log(error)
    }

})


router.delete('/:nip', validator.validate("DeleteAkun"), validator.verify, (req, res) => {

    try {
        var query = {
            nip: req.params.nip
        };
        aModel.getData(query)
        .then(x => {
            if (x != "Empty") {
                aModel.deleteData(query)
                .then(result => {
                    if (result) {
                        if (result == false) {
                            listRes.serverError(res)
                        } else {
                            listRes.deleteOk(res)
                        }
                    }
                })
            } else {
                listRes.clientEntity(res, "NIP tidak tersedia!")
            }
        })
    } catch (error) {
        listRes.serverError(res)
        console.log(error)
    }

})

module.exports = router