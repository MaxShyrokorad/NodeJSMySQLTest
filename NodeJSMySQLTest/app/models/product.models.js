const pool = require('../db/db-connection').promise()
const UserModel = require('./user.model')


class ProductModels {
    tableName = 'products'

    create = async ({title, price, image= null, user_id= null}) => {
        return await pool.query(`INSERT INTO ${this.tableName} (created_at, title, price, image, user_id) VALUE (NOW(), ?, ?, ?, ?)`,
            [title, price, image, user_id])
            .then(async () => {
                console.log('Product created successfully');
                const allProduct = await pool.query(`SELECT * FROM ${this.tableName}`)
                if (!allProduct)
                    console.log('Failed to get products from database')

                // const result = await pool.query(`SELECT * FROM ${this.tableName}, ${UserModel.tableName}
                // WHERE ${this.tableName}.user_id = ${UserModel.tableName}.id`)

                const {password, ...user} = await UserModel.getById(user_id)
                const {...product} = allProduct[0][allProduct[0].length - 1]
                product.user = user
                product.created_at = product.created_at.toLocaleString('ua', {
                    year: 'numeric',
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                })
                return product
            })
            .catch(err => console.log('Product creation error:',err.message))
    }

    delete = async(id) => {
        return await pool.query(`DELETE FROM ${this.tableName} WHERE id = ${id}`)
            .then(result => {
                return result ? result[0].affectedRows : 0
            })
            .catch(err =>console.log(err.message))
    }

    update = async ({title, price}, id) => {
        return await pool.query(`UPDATE ${this.tableName} SET title = '${title}', price = ${price} WHERE id = ${id}`)
            .then(async () => {
                return await this.getById(id)
            })
            .catch(err => console.log('Product update error:',err.message))
    }

    upload = async (imagePath, id) => {
        return await pool.query(`UPDATE ${this.tableName} SET image = '${imagePath}' WHERE id = ${id}`)
            .then(async () => {
                return await this.getById(id)
            })
            .catch(err => console.log('Product update error:',err.message))
    }

    getItems = async () => {
        return await pool.query(`SELECT * FROM ${this.tableName}`)
            .then( async (result) => {
                let items = result[0]

                // console.log(items)
                for(let item of items) {
                    const user_id = item.user_id
                    item.created_at = item.created_at.toLocaleString('ua', {
                        year: 'numeric',
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    })
                    if (!user_id) {
                        item.user_id = 'Отсутствует'
                    } else {
                        const {password, ...user} = await UserModel.getById(user_id)

                        item.user = user
                    }
                }
                return items
            })
            .catch(err => console.log('Failed to get products from database',err.message))
    }

    getById = async(id) => {
        return await pool.query(`SELECT * FROM ${this.tableName} WHERE id = ${id}`)
            .then( async (result) => {
                const user_id = result[0][0].user_id
                if (!user_id) {
                    result[0][0].user_id = 'Отсутствует'
                    return result[0][0]
                }
                const {password, ...user} = await UserModel.getById(user_id)

                const {...product} = result[0][0]

                product.user = user
                return product
            })
            .catch(err => console.log('Failed to get product by id from database',err.message))
    }

}

module.exports = new ProductModels;