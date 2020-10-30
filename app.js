const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Cors = require('./includes/Cors')
const auth = require('./api/Auth/Auth')
const logging = require('morgan');
const fs = require('fs');
const fileUpload = require('express-fileupload');


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(fileUpload({createParentPath: true}))

// Router Login
const login = require('./api/Auth/Login/Login')

// Router Pegawai
const pegawai = require('./api/Pegawai/Pegawai')

// Router Admin
const admin = require('./api/Admin/Admin')

// Router SuperAdmin
const superAdmin = require('./api/SuperAdmin/SuperAdmin')

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE'
        );
        return res.status(200).json({});
    }
    next();
});

/**Log system
 * log will sending to the file,
 * so admin can access directly to the file
 * temporary hardcoded for folder 
 */
const path = './api/logapi';
const fileName = '/access.log';
try {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
} catch (err) {
    console.error(err);
}
var writeFile = fs.createWriteStream(path + fileName, { flags: 'a' });
app.use(logging('combined', { stream: writeFile }));

app.use("/pegawai", auth.checktoken, (req, res, next) => {
    if(req.user_data.tipe_user !== "Pegawai"){
        res.status(403).send({
            message:"API ini membutuhkan hak akses Pegawai"
        });
    }else{
        next();
    }
}, pegawai)
app.use("/admin", auth.checktoken, (req, res, next) => {
    if(req.user_data.tipe_user !== "Admin"){
        res.status(403).send({
            message:"API ini membutuhkan hak akses Admin"
        });
    }else{
        next();
    }
}, admin)
app.use("/superadmin", auth.checktokenAdmin, (req, res, next) => {
    if(req.user_data.tipe_user !== "sAdmin"){
        res.status(403).send({
            message:"API ini membutuhkan hak akses Super Admin"
        });
    }else{
        next();
    }
}, superAdmin)

// Temporary Token
app.get('/login',(req,res,next) => {

    res.status(200).send({        
        tokenPegawai:auth.generateToken({username:'pegawai', password:'123', tipe_user:'Pegawai'}),
        tokenAdmin:auth.generateToken({username:'admin', password:'123', tipe_user:'Admin'}),
        tokenSuperAdmin:auth.generateTokenAdmin({username:'superadmin', password:'123', tipe_user:'sAdmin'}),
    });
});

app.use('/login', login)

// Handle Not Found or Database Error
app.use((req, res, next) => {
    var error = new Error('Not Found')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        message: error.message
    })
})


module.exports = app