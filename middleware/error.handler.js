function Errors(err, req, res, next){
  console.log(err)
  next(err)
}

function ErrorHandler(err, req, res, next){
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

function BoomHandler(err, req, res, next){
  if(err.isBoom){
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}

module.exports = { Errors, ErrorHandler, BoomHandler}