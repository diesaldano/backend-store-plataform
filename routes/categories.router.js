const express = require('express')
const { faker } = require('@faker-js/faker');

const router = express.Router()

router.get('/', (req, res)=>{
  const { size } = req.query;
  const limit = size || 10
  const categories = []
  for(let index = 0; index < limit; index++){
    categories.push({
      id: faker.datatype.uuid(),
      category: faker.company.name(),
    })
  }
  res.json(categories)
})

module.exports = router
