const express = require('express')
const router = express.Router()

const kegiatan = require('./Kegiatan/Kegiatan')
const akun = require('./Akun/Akun')
const jadwal = require('./Jadwal/Jadwal')
const absen = require('./Absen/Absen')
const pegawai = require('./Pegawai/Pegawai')

router.use('/kegiatan', kegiatan)
router.use('/akun', akun)
router.use('/jadwal', jadwal)
router.use('/absen', absen)
router.use('/pegawai', pegawai)

module.exports = router