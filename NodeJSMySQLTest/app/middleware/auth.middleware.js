const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        const bearer = 'Bearer '

        if (!authHeader || !authHeader.startsWith(bearer))
            console.log('Authorization HTTP header missing')

        // Получаем токен
        const token = authHeader.replace(bearer, '')

        // Получаем секретный ключ
        const secretKey = process.env.SECRET_JWT || ""

        // Декодируем токен
        const decoded = jwt.verify(token, secretKey)

        // Получаем пользователя по id
        const user = await UserModel.getById(decoded.user_id)

        if (!user)
            console.log('Failed to get user from database')

        user.token = token

        req.currentUser = user

        next()
    } catch (ex) {
        res.status(401).send()
    }
}


