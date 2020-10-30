const Database = require('../includes/Database')
const Query = require('../Models/Query')
const useQuery = new Query()

class Model {

    getData = (where, hidden) => {

        const status = (hidden === null || hidden === undefined || hidden === true)?` akun.soft_delete = '0' `:` akun.soft_delete = '1' `
        const conditional = (where === undefined || where === null || Object.keys(where).length <= 0)?' WHERE '+status:` WHERE akun.${[[Object.keys(where)]]} = '${[[Object.values(where)]]}' AND `+status
        const sql = `SELECT * FROM akun INNER JOIN pegawai ON akun.nip = pegawai.nip`
        
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
            table: 'akun'
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
            table: 'akun',
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
            table: 'akun',
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