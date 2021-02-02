const express = require('express')
const userController = require('../controllers/user.controller')
const productController = require('../controllers/product.controller')
const userRouter = express.Router()
const auth = require('../middleware/auth.middleware')

userRouter.post('/register', userController.userRegister)
userRouter.post('/login', userController.userLogin)
userRouter.get('/me',auth, userController.getCurrentUser)
userRouter.post('/items',auth, productController.createItem)
userRouter.get('/items', productController.getItemsList)
userRouter.get('/items/:id', productController.getItemsById)
userRouter.delete('/items/:id', auth, productController.deleteItem)
userRouter.patch('/items/:id', auth, productController.updateItem)
userRouter.post('/items/:id/images', auth, productController.uploadItemImage)

module.exports = userRouter;


