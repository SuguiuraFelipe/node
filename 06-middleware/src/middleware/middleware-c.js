module.exports = function(req, res, next){
    console.log('executando o middleware c')
    req.middlewareC = 'ok!'
    next()
}