const express = require('express');
const routerApi = require('./routes')

const { Errors, ErrorHandler, BoomHandler } = require('./middleware/error.handler')

const app = express()

const port = 8000

app.use(express.json())

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