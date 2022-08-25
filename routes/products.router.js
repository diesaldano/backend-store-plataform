const express = require('express')
const ProductsService = require('../services/products.service')

const validatorHandler = require('../middleware/validator.handler')
const { productSchema, createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schemas')

const router = express.Router()
const service = new ProductsService()

router.get('/', 
  validatorHandler(productSchema, 'params'),
  async (req, res, next)=>{
    try {
      const products = await service.find()
      res.status(202).json(products)
    } catch (error) {
      next(error)
    }
})

router.get('/:id',
  validatorHandler(getProductSchema, params),
  async (req, res, next)=>{
  try {
    const { id } = await req.params
    const product = service.findOne(id) 
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.post('/',
  validatorHandler(createProductSchema, body),
  async (req, res, next)=> {
  try {
    const { body } = req;
    const newProduct = await service.create(body)
    res.status(201).json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id',
  validatorHandler(updateProductSchema, params),
  validatorHandler(updateProductSchema, body),
  async (req, res, next)=> {
  try {
    const { id } = req.params
    const { body } = req
    const patch = await service.update(id, body)
    res.status(204).json(patch)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next)=> {
  try {
    const { id } = req.params
    const product = await service.delete(id)
    res.status(202).json(product)
  } catch (error) {
    next(error)
  }
})

module.exports = router
