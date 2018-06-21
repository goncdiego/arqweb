'use strict'
const mongoose = require('mongoose') 

//LA PROPIEDAD SCHEMA DE MOONGOSE PERMITE DEFINIR EL ESQUEMA DE LA BASE
const Schema = mongoose.Schema 

//MODELO DE LA BASE
const ProductSchema = Schema({
    tipo: String,
    marca: String,
    categoria: { type: String, enum: ['monitor', 'vidcard', 'mother', 'cpu', 'storage']},
    precio: { type: Number, default:0 },
})

//EXPORTO EL MODELO CON EL METODO .model de mongoose
module.exports = mongoose.model('Product', ProductSchema)