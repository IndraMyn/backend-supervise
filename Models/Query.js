const Database = require('../includes/Database')

class Query {
    
    get = (setting) => {

        const { table, columns, where, hidden } = setting

        const column = (columns === null || columns === undefined )?'*': [[columns]]
        const status = (hidden === null || hidden === undefined)?` soft_delete = '0' `:` soft_delete = '1' `
        const conditional = (where === undefined || where === null || Object.keys(where).length <= 0)?' WHERE '+status:' WHERE ? AND '+status
    
        const sql = `SELECT ${column} FROM ${table}`

        return new Promise((resolve) => {
            Database.query(sql+conditional, where, (error, rows, fields) => {
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

    insert = (setting, values) => {

        const { table } = setting

        const columns = Object.keys(values)
        const body = Object.values(values)

        const sql = `INSERT INTO ${table} (${[[columns]]}) VALUES ? `

        return new Promise((resolve) => {
            Database.query(sql, [[body]], (error, result) => {
                if (error) {
                    console.log(error)
                    resolve(false)
                } else {
                    console.log(result);
                    resolve(true)
                }
            })
        })

    }

    update = (setting, values) => {

        const { table, where } = setting

        const conditional = (where === undefined || where === null || Object.keys(where).length <= 0)?'':` WHERE ${Object.keys(where)} = ${Object.values(where)} `

        const sql = `UPDATE ${table} SET ? `

        return new Promise((resolve) => {

            Database.query(sql+conditional, values, (error, result) => {
                if (error) {
                    console.log(error)
                    resolve(false)
                } else {
                    console.log(result);
                    resolve(true)
                }
            })

        })

    }

    delete = (setting) => {

        const { table, where } = setting

        const conditional = (where === undefined || where === null || Object.keys(where).length <= 0)?'':'WHERE ? '

        const sql = `UPDATE ${table} SET soft_delete = '1' `

        return new Promise((resolve) => {

            Database.query(sql+conditional, where, (error, result) => {
                if (error) {
                    console.log(error)
                    resolve(false)
                } else {
                    console.log(result)
                    resolve(true)
                }
            })

        })

    }
    
}

module.exports = Query