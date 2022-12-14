const Joi = require('joi')

const id = Joi.string()
const title = Joi.string()
const price = Joi.number()

const productSchema = Joi.object({
  id: id,
  image: Joi.string(),
  title: 	title,
  price: 	price,
  description: Joi.string().max(100),
})

const createProductSchema = Joi.object({
  id: id,
  title: 	title.required(),
  price: 	price.required(),
})

const updateProductSchema = Joi.object({
  id: id,
  title: 	title,
  price: 	price,
})

const getProductSchema = Joi.object({
  id: 	id.required(),
})


module.exports = { productSchema, createProductSchema, updateProductSchema, getProductSchema }