const Database = require('../includes/Database')
const Query = require('../Models/Query')
const useQuery = new Query()

class Model {

    getData = (where) => {

        const setting = {
            table: 'pegawai',
            where: where
        }

        return new Promise((resolve) => {
            useQuery.get(setting)
            .then(result => {
                resolve(result)
            })
        })
    }

    insertData = (values) => {
        
        const setting = {
            table: 'pegawai'
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
            table: 'pegawai',
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
            table: 'pegawai',
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