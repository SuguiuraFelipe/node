const express = require('express')

const app = express()

app.use(function(req, res, next){
    console.log('Executando middleware A')
    req.middlewareA = 'ok!'
    next()
})

function middlewareB(req, res, next){
    console.log('Executando o middleware b')
    req.middlewareB = 'ok!'
    next()
}

app.get('/testeA', (req, res) =>{
    console.log({a: req.middlewareA, b: req.middlewareB})
    res.end()
})

app.get('/testeB', middlewareB, (req, res) =>{
    console.log({a: req.middlewareA ,b: req.middlewareB})
    res.end()
})

const PORT = 3000
app.listen(PORT, () => console.log('Servidor iniciado!'))