const express = require('express')
const ProductsService = require('../services/products.service')

const router = express.Router()
const service = new ProductsService()

router.get('/', (req, res)=>{
  const products = service.find()
  res.status(202).json(products)
})

router.get('/filter', (req, res)=>{
  res.send('aplying filters')
})

router.get('/:id', (req, res)=>{
  const { id } = req.params
  const product = service.findOne(id) 
  res.json(product)
})

router.post('/', (req, res)=> {
  const body = req.body;
  const newProduct = service.create(body)
  res.status(201).json(newProduct)
})

router.patch('/:id', (req, res)=> {
  const { id } = req.params
  const { body } = req
  const patch = service.update(id, body)
  res.status(204).json(patch)
})

router.delete('/:id', (req, res)=> {
  const { id } = req.params
  const product = service.delete(id)
  res.status(202).json(product)
})

module.exports = router
