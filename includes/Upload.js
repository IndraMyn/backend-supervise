exports.checkFiles = (req, res, next) => {
    if (req.files == null) {
        req.files = {}
        return next()
    } else {
        return next()
    }
}

exports.File = (req, res, next) => {

    const allowed = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'application/pdf']
    
    if (req.files.file_kegiatan != undefined) {
        let file = req.files.file_kegiatan
        const path = "./assets/file_kegiatan/"

        const check = allowed.find(item => item == file.mimetype)


        if (file.size > 10000000) {
            res.status(422).send({
                message: 'Ukuran file tidak boleh lebih dari 10MB'
            })
        } 
        else if (check == undefined) {
            res.status(422).send({
                message: 'Format tidak sesuai!'
            })
        }
        else {
            file.mv(path + file.name)
            return next()
        }
    } else {
        req.files = (req.files.foto_kegiatan == null)?{...req.file, file_kegiatan : null, foto_kegiatan: null}:{...req.file, file_kegiatan : null, foto_kegiatan: req.files.foto_kegiatan}
        return next()
    }
}

exports.Avatar = (req, res, next) => {

    const allowed = ['image/jpeg', 'image/jpg', 'image/png']

    if (req.files.avatar != undefined) {
        let avatar = req.files.avatar
        const path = "./assets/avatar/"

        const check = allowed.find(item => item == avatar.mimetype)

        if (avatar.size > 10000000) {
            res.status(422).send({
                message: 'Ukuran gambar tidak boleh lebih dari 10MB'
            })
        } 
        else if (check == undefined) {
            res.status(422).send({
                message: 'Format tidak sesuai!'
            })
        }
        else {
            avatar.mv(path + avatar.name)
            return next()
        }
    } else {
        req.files = {...req.files, avatar : null} 
        return next()
    }
}

exports.Foto = (req, res, next) => {

    const allowed = ['image/jpeg', 'image/jpg', 'image/png']

    if (req.files.foto_kegiatan != undefined) {
        let foto = req.files.foto_kegiatan
        const path = "./assets/foto_kegiatan/"

        const check = allowed.find(item => item == foto.mimetype)

        if (foto.size > 10000000) {
            res.status(422).send({
                message: 'Ukuran gambar tidak boleh lebih dari 10MB'
            })
        } 
        else if (check == undefined) {
            res.status(422).send({
                message: 'Format tidak sesuai!'
            })
        }
        else {
            foto.mv(path + foto.name)
            return next()
        }
    } else {
        req.files = (req.files.file_kegiatan == null)?{...req.file, file_kegiatan : null, foto_kegiatan: null}:{...req.file, file_kegiatan : req.files.file_kegiatan, foto_kegiatan: null}
        return next()
    }
}

exports.Absen = (req, res, next) => {

    const allowed = ['image/jpeg', 'image/jpg', 'image/png']

    if (req.files.foto_absen != undefined) {
        let foto = req.files.foto_absen
        const path = "./assets/foto_absen/"

        const check = allowed.find(item => item == foto.mimetype)

        if (foto.size > 10000000) {
            res.status(422).send({
                message: 'Ukuran gambar tidak boleh lebih dari 10MB'
            })
        } 
        else if (check == undefined) {
            res.status(422).send({
                message: 'Format tidak sesuai!'
            })
        }
        else {
            foto.mv(path + foto.name)
            return next()
        }
    } else {
        req.files = {...req.files, foto_absen : null} 
        return next()
    }
}