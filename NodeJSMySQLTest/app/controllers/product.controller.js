const ProductModels = require("../models/product.models")

const dotenv = require('dotenv').config()

class ProductController {

    createItem = async (req, res) => {
        if (!req.body.title)
            return res.status(422).send({"field": "title", "message": "Title is required"})

        if (!req.body.price)
            return res.status(422).send({"field": "price", "message": "Price is required"})

        const product = await ProductModels.create(req.body)
        if (!product) {
            console.log('Product not found')
            return res.status(404).send()
        }
        res.status(200).send(product)
    }

    deleteItem = async (req, res) => {
        const result = await ProductModels.delete(req.params.id)
        if (!result) {
            console.log('Product not found')
            return res.status(404).send()
        }
        console.log('Product removed successfully')
        res.status(200).send()
    }

    updateItem = async (req, res) => {
        if (req.body.title.length < 3)
            return res.status(422).send({"field":"title", "message":"Title should contain at least 3 characters"})
        const product = await ProductModels.update(req.body, req.params.id)
        if (!product) {
            console.log('Product not found')
            return res.status(404).send()
        }
        console.log('Product update successfully');
        res.status(200).send(product)
    }

    uploadItemImage = async(req, res) => {
        const imagePath = 'http://example.com/' + req.file.destination + '/' +req.file.originalname.replaceAll(' ', '-')
        const imageSize = req.file.size
        if (imageSize > 5*10**5) {
            console.log('The file is too big.')
            return res.status(422).send({"field":"image", "message":`The file '${req.file.filename}' is too big.`})
        }
        const product = await ProductModels.upload(imagePath, req.params.id)
        if (!product) {
            console.log('Product not found')
            return res.status(404).send()
        }

        console.log('Upload image successfully')
        res.status(200).send(product)
    }

    getItemsById = async (req, res) => {
        const product = await ProductModels.getById(req.params.id)
        if (!product) {
            console.log('Product not found')
            return res.status(404).send()
        }
        res.status(200).send(product)
    }

    getItemsList = async (req, res) => {
        const products = await ProductModels.getItems()
        if (!products) {
            console.log('Products not found')
            return res.status(404).send()
        }
        res.send(products)
    }
}


module.exports = new ProductController;