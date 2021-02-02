const UserModel = require("../models/user.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()

class UserController {

    userRegister  = async (req, res) => {

        const userByEmail = await UserModel.getByEmail(req.body.email)
        if (userByEmail)
            return res.status(422).send({"field":"email","message":"This email address is already registered"})

        if (req.body.password.length < 6)
            return res.status(422).send({"field":"password", "message":"Password must be at least 6 characters"})

        await this.hashPassword(req)

        const result = await UserModel.create(req.body)

        const user = await UserModel.getByEmail(req.body.email)

        const secretKey = process.env.SECRET_JWT || ""

        const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {expiresIn: '24h'})

        if (!result)
            res.status(500).send({'message':'Something went wrong'})

        console.log('User registered successfully')
        res.status(200).send({token})
    }

    userLogin = async (req, res) => {

        const { email, password: pass } = req.body

        const user = await UserModel.getByEmail(email)

        if (!user)
            return res.status(404).send({"field":"email","message":"Wrong email"})

        const isMatch = await bcrypt.compare(pass, user.password)

        if (!isMatch)
            return res.status(422).send({"field":"password","message":"Wrong password"})

        const secretKey = process.env.SECRET_JWT || ""
        const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
            expiresIn: '24h'
        })

        const { password, ...userWithoutPassword } = user

        console.log('User login successfully')
        res.send({ ...userWithoutPassword, token })
    }

    getCurrentUser = async (req, res) => {
        const { password, ...userWithoutPassword } = req.currentUser;

        res.send(userWithoutPassword);
    }

    hashPassword = async (req) => {
        if (req.body.password)
            req.body.password = await bcrypt.hash(req.body.password, 8)
    }
}


module.exports = new UserController;