const express = require('express')
const ProductsService = require('../services/products.service')

const router = express.Router()
const service = new ProductsService()

router.get('/', async (req, res)=>{
  try {
    const products = await service.find()
    res.status(202).json(products)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

router.get('/filter', (req, res)=>{
  res.send('aplying filters')
})

router.get('/:id', async (req, res)=>{
  try {
    const { id } = await req.params
    const product = service.findOne(id) 
    res.json(product)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

router.post('/', async (req, res)=> {
  try {
    const { body } = req;
    const newProduct = await service.create(body)
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

router.patch('/:id', async (req, res)=> {
  try {
    const { id } = req.params
    const { body } = req
    const patch = await service.update(id, body)
    res.status(204).json(patch)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

router.delete('/:id', async (req, res)=> {
  try {
    const { id } = req.params
    const product = await service.delete(id)
    res.status(202).json(product)
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

module.exports = router
