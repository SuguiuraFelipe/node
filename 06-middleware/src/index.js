const express = require('express')
const middlewareC = require('./middleware/middleware-c')

const app = express()

app.use(middlewareC)

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
    throw new Error('Deu ruim')
    res.end()
})

app.get('/testeB', middlewareB, (req, res) =>{
    console.log({a: req.middlewareA ,b: req.middlewareB})
    res.end()
})

app.use(function(err, req, res, next){
    if(err){
        console.log(err.message)
        res.status(400)
        res.json({message: err.message})
    }else{
        next()
    }
})

const PORT = 3000
app.listen(PORT, () => console.log('Servidor iniciado!'))