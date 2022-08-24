const express = require('express');
const routerApi = require('./routes')
const app = express()

const port = 8000

app.use(express.json())

app.get('/', (req, res)=> {
  res.send("Server running")
})

routerApi(app)

app.listen(port, ()=> {
  console.log('Running in Port: ', port)
})