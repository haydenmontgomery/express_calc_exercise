const express = require('express');
const ExpressError = require('./expressError')

const app = express();



app.get('/average', function(req, res, next) {
    
})

app.get('/median', function(req, res, next) {

})

app.get('/mode', function(req, res, next) {

})

app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404)
    next(e)
  })
  
  
  app.use(function (err, req, res, next) {
    let status = err.status || 500;
    let message = err.msg;
  
    return res.status(status).json({
      error: { message, status }
    });
  });
  
  app.listen(3000, () => {
    console.log("Server running on port 3000")
  });