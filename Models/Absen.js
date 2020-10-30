const Database = require('../includes/Database')
const Query = require('../Models/Query')
const useQuery = new Query()

class Model {

    checkAbsen = (where, hidden) => {

        const status = (hidden === null || hidden === undefined || hidden === true)?` absen.soft_delete = '0' `:` absen.soft_delete = '1' `
        const conditional = (where === undefined || where === null || Object.keys(where).length <= 0)?' WHERE '+status:` WHERE absen.nip = '${where.nip}' AND absen.tgl_absen = '${where.tgl_absen}' AND `+status
        const sql = `SELECT * FROM absen INNER JOIN pegawai ON absen.nip = pegawai.nip`
        
        return new Promise((resolve) => {
            Database.query(sql+conditional, (error, rows, fields) => {
                if (error) {
                    console.log(error)
                    resolve(false)
                }else{
                    if (rows.length <= 0) {
                        resolve('Empty')
                    } else {
                        resolve(rows)
                    }
                }
            })
        })
             
    }

    getData = (where, hidden) => {

        const status = (hidden === null || hidden === undefined || hidden === true)?` absen.soft_delete = '0' `:` absen.soft_delete = '1' `
        const conditional = (where === undefined || where === null || Object.keys(where).length <= 0)?' WHERE '+status:` WHERE absen.${[[Object.keys(where)]]} = '${[[Object.values(where)]]}' AND `+status
        const sql = `SELECT * FROM absen INNER JOIN pegawai ON absen.nip = pegawai.nip`
        
        return new Promise((resolve) => {
            Database.query(sql+conditional, (error, rows, fields) => {
                if (error) {
                    console.log(error)
                    resolve(false)
                }else{
                    if (rows.length <= 0) {
                        resolve('Empty')
                    } else {
                        resolve(rows)
                    }
                }
            })
        })
             
    }

    insertData = (values) => {
        
        const setting = {
            table: 'absen'
        }

        return new Promise((resolve) => {
            useQuery.insert(setting, values)
            .then(result => {
                resolve(result)
            })
        }) 
    }

    updateData = (where, values) => {

        const setting = {
            table: 'absen',
            where: where
        }

        return new Promise((resolve) => {
            useQuery.update(setting, values)
            .then(result => {
                resolve(result)
            })
        })
    }

    deleteData = (where) => {

        const setting = {
            table: 'absen',
            where: where
        }

        return new Promise((resolve) => {
            useQuery.delete(setting)
            .then(result => {
                resolve(result)
            })
        })

    }

}

module.exports = Model