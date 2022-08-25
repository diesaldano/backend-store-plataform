const express = require('express');
const cors = require('cors')
const routerApi = require('./routes')

const { Errors, ErrorHandler, BoomHandler } = require('./middleware/error.handler')

const app = express()
const port = 8000

app.use(express.json())

//implement cors
const allowDomains = ['http:localhost:8000', 'http:localhost:3000']
const options = {
  origin: (origin, callback)=> {
    if(allowDomains.includes(origin)){
      callback(null, true)
    } else {
      callback(new Errors('no permitido'))
    }
  }
}
app.use(cors())

app.get('/', (req, res)=> {
  res.send("Server running")
})

routerApi(app)

app.use(Errors)
app.use(ErrorHandler)
app.use(BoomHandler)

app.listen(port, ()=> {
  console.log('Running in Port: ', port)
})