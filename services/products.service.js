const { faker } = require('@faker-js/faker');

class ProductsService {
  constructor(){
    this.products = []
    this.generateProducts();
  }

  generateProducts(){
    this.products = []
    const limit = 100
    for(let index = 0; index < limit; index++){
      this.products.push({
        id: faker.datatype.uuid(),
        image: faker.image.cats(),
        title: 	faker.commerce.productName(),
        price: 	parseInt(faker.commerce.price()),
        description: faker.lorem.paragraph(),
      })
    }
  }

  async create(body){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...body
    }
    this.products.push(newProduct)
    return {
      message: 'created',
      data: newProduct
    }
  }

  async find(){
    return this.products
  }

  async findOne(id){
    return this.products.find(item => item.id === id)
  }

  async update(id, body){
    let index = this.products.findIndex(item => item.id === id)
    if(index === -1 ){ throw new Error('Product not found') }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...body
    }
    return {
      message: 'update',
      data: this.products[index],
    }
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id)
    if(index === -1){ throw new Error('Productnot found') }
    this.products.splice(index, 1)
    return {
      message: 'deleted',
      id
    }
  }
}

module.exports = ProductsService;