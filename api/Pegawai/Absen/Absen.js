const express = require('express')
const router = express.Router()

const validator = require('../../../Validator/AbsenValidator')

const Response = require('../../../includes/Response')
const listRes = new Response()

const AbsenModel = require('../../../Models/Absen')
const abModel = new AbsenModel()

const jadwalModel = require('../../../Models/Jadwal')
const jModel = new jadwalModel()

const Extras = require('../../../includes/Extras')
const FiltExtras = new Extras()

const getDate = require('../../../includes/Date')

const Upload = require('../../../includes/Upload')


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

router.post('/', validator.validate('PostAbsen'), validator.verify, Upload.checkFiles, Upload.Absen, (req, res) => {
    
    try {
        const allowed = ['id_absen', 'tgl_absen', 'waktu_absen', 'status_absen', 'keterangan_absen', 'nip', 'foto_absen']

        const days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU']
        
        const foto = req.files.foto_absen
        req.body.tgl_absen = getDate.date("date")
        req.body.waktu_absen = getDate.date("time")
        req.body.foto_absen = (foto == null) ? null : foto.name

        if (foto != null) {
            jModel.getData({hari : days[getDate.date("day")]})
            .then(x => {
                
                if (x == "Empty") {

                    listRes.postOk(res, "Tidak ada jadwal hari ini")
                
                } else {

                    abModel.checkAbsen({tgl_absen : getDate.date("date"), nip : req.body.nip })
                    .then(x => {

                        if (x == "Empty") {

                            if (getDate.date("time") > x[0].mulai) {
                                req.body.status_absen = "terlambat"
                            } else {
                                req.body.status_absen = "tidak terlambat"
                            }
                    
                            var filtered = FiltExtras.filter_object(req.body, allowed)
                            abModel.insertData(filtered)
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
                            listRes.postOk(res, "Anda sudah absen pada hari ini!")
                        }
                    })
                }

            })
        } else {
            listRes.clientEntity(res, "Foto harus diisi!")
        }
        
    } catch (error) {
        listRes.serverError(res)
        console.log(error)   
    }

})

// router.put('/', (req, res) => {

//     abModel.updateData(req.query, req.body)
//     .then(result => {
//         if (result) {
//             if (result == false) {
//                 listRes.serverError(res)
//             } else {
//                 listRes.putOk(res)
//             }
//         }
//     })

// })


// router.delete('/', (req, res) => {

//     abModel.deleteData(req.query)
//     .then(result => {
//         if (result) {
//             if (result == false) {
//                 listRes.serverError(res)
//             } else {
//                 listRes.deleteOk(res)
//             }
//         }
//     })

// })

module.exports = router