'use strict'
const express = require('express')
const bodyParser = require('body-parser')

//En Product tengo el esquema de la base, lo importo
const Product = require('./models/product') 

const app = express()
const mongoose = require('mongoose') 
const puerto = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//PRUEBAS
//1ER PARAMETRO URL QUE ESCUCHA EL METODO
//DEVUELVE UN CALLBACK CON 2 PARAMETROS REQ Y RES
app.get('/hola', (req, res) => { 
  res.send({ message: 'Hola Mundo!' })
})

//INDEX HTML
app.get('/', (req, res) => { 
  res.sendfile('index.html');
})

//SERVICIOS

//DEVUELVO TODOS LOS PRODUCTOS
app.get('/api/product', (req, res) => { 
    //LE PASO UN OBJETO VACIO QUE BUSQUE TODOS LOS PRODUCTOS
    Product.find({}, (err, product) => {
       if (err) return res.status(500).send({ message: `Error al Realizar la Peticion: ${err}`})
       if (!product) return res.status(484).send({ message: `Error el producto no existe!`})

       res.send(200, {product})
    })
  })

//DEVUELVO PRODUCTO POR ID  
app.get('/api/product/:productId', (req, res) => { 
    //Obtengo el ID por la url
    let productId = req.params.productId

    Product.findById(productId, (err, product) =>  {
       if (err) return res.status(500).send({ message: `Error al Realizar la Peticion: ${err}`})
       if (!product) return res.status(484).send({ message: `Error el producto no existe!`})

       res.status(200).send({product})


    })
})


//ALTA DE PRODUCTOS
app.post('/api/product', (req, res) => { 
    console.log('Post! /api/product')
    console.log(req.body)
    
    let product = new Product()
    product.tipo = req.body.tipo
    product.marca = req.body.marca
    product.categoria = req.body.categoria
    product.precio = req.body.precio

    product.save((err, ProductStored) => {

    if (err) res.status(500).send({message: `Error al guardar en la base de datos : ${err}`}) 
    
    res.status(200).send({product: ProductStored})

    })
})


//UPDATE DE PRODUCTOS
app.put('/api/product/:productId', (req, res) => { 
 //Obtengo el ID por la url, Product es el modelo de mongoose
 let productId = req.params.productId

 // campos a actualizar los obtengo del request
 let update = req.body

 //Uso la otra funcion de mongoose para encontrar y actualizar
 //recibe un callback con el error y si existe el producto actualizado
 Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if (err) return res.status(500).send({ message: `Error al actualizar el producto: ${err}`})

    //res.status(200).send({product: productUpdated})
    res.status(200).send({ message: `El producto ha sido actualizado!`})
  })
})

//BAJA DE PRODUCTOS
app.delete('/api/product/:productId', (req, res) => { 
 //Obtengo el ID por la url, Product es el modelo de mongoose
    let productId = req.params.productId

    Product.findById(productId, (err, product) =>  {
        if (err) return res.status(500).send({ message: `Error al borrar el producto: ${err}`})
        
        //con el objeto product, tmb recibe un callback uso funcion remove
        product.remove(err => {
          if (err) return res.status(500).send({ message: `Error al borrar el producto: ${err}`})
          res.status(200).send({ message: `El producto ha sido eliminado!`})
      })
    })
})


//FUNCION CALLBACK DE CONECCION A LA DB
mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
  if (err)  {
     return console.log(`Error al Conectar a la DB!: ${err}`) 
  }
  console.log(`Coneccion a la DB establecida!`)
  app.listen(puerto, () => {
    console.log(`Corriendo el API REST! en http://localhost:${puerto}`)
})


})

