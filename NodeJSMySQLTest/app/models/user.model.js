const pool = require('../db/db-connection').promise()


class UserModel {
    tableName = 'users'

    create = async ({username, email, password, phone}) => {
        const result = await pool.query(`INSERT INTO ${this.tableName} (username, email, password, phone) VALUE (?, ?, ?, ?)`,
            [username, email, password, phone=null])
            // .then(result =>{
            //     console.log('User created successfully');
            //     // return pool.execute("SELECT * FROM  ${this.tableName}");
            // })
            .catch(err =>console.log(err.message))
        return result ? result[0].affectedRows : 0
    }

    delete = async(id) => {
        await pool.query(`DELETE FROM ${this.tableName} WHERE id = ${id}`)
            .catch(err =>console.log(err.message))
    }

    getAll = async() => {
        return await pool.query(`SELECT * FROM ${this.tableName}`)
            .catch(err =>console.log(err.message))
    }

    getById = async(id) => {
        const result = await pool.query(`SELECT * FROM ${this.tableName} WHERE id = ${id}`)
            // .then(result =>{
            //     console.log(result[0])
            // })
            .catch(err =>console.log(err.message))
        return result[0][0]
    }

    getByEmail = async(email) => {
        const result = await pool.query(`SELECT * FROM ${this.tableName} WHERE email = '${email}'`)
            // .then(result =>{
            //     console.log(result[0])
            // })
            .catch(err =>console.log(err.message))
        return result[0][0]
    }
}

module.exports = new UserModel;