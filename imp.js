const express    = require('express');
const bodyParser = require('body-parser');
const moment     = require('moment');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express();

var _products = [

    {id: 1, Categoria: 'Monitor', Tipo: 'Led-22Inch', Marca: 'Samsung', Precio: '6500' },
    {id: 8, Categoria: 'Monitor', Tipo: 'Led-26Inch', Marca: 'Samsung', Precio: '8500' },
    {id: 2, Categoria: 'GPU', Tipo: 'PCI-E', Marca: 'Asus', Precio: '23500' },
	{id: 3, Categoria: 'Procesador', Tipo: 'i7-Socket-1150', Marca: 'Intel', Precio: '13500' },
	{id: 4, Categoria: 'Placa Madre', Tipo: 'ATX', Marca: 'Asus', Precio: '3500' },
	{id: 5, Categoria: 'Memoria', Tipo: 'DDR4-16GB', Marca: 'Corsair', Precio: '2500' },
	{id: 6, Categoria: 'Placa de Video', Tipo: 'NVIDIA12GB', Marca: 'Asus', Precio: '25500' },
	{id: 7, Categoria: 'Almacenamiento', Tipo: 'HD1TB', Marca: 'Seagate', Precio: '6500' }

];


const url = 'mongodb://127.0.0.1:27017/test';

//creo y conecto con la base de datos mongodb


// parse body as json
app.use(bodyParser.json());

// all requests
app.use((req, res, next) => {
    console.log(`${req.method}: ${req.path} - ${moment().format(moment.HTML5_FMT.DATETIME_LOCAL_MS)}`);
    next();
});

// get home
app.get('/', (req, res) => {

    let list = [];
    _products.forEach((p) => {

	    list.push(`<li>Id: ${p.id}</li>`);
        list.push(`<li>Categoria: ${p.Categoria}</li>`);
		list.push(`<li>Tipo: ${p.Tipo}</li>`);
		list.push(`<li>Marca: ${p.Marca}</li>`);
		list.push(`<li>Precio: ${p.Precio}</li>`);
		
    });

    res.send(
        `<html>
            <head>
                <title> Categoria de Productos </title>
            </head>
            <body>
                <ul>
                    ${list.join('')}
                </ul>            
            </body>
        </html>`
    );

});



// obtener todas las categorias
app.get('/arqweb/productos', (req, res) => {
    res.json(_products);
});

// Agregar una categoria mas a la lista (submit)
app.post('/arqweb/productos', (req, res) => {
    _products.push(req.body);
    res.status(201).send(req.body);
});
//-----------------------------------------------Monitores---------------------------------------------------

// Obtener monitor por su marca y/o tipo
app.get('/arqweb/productos/monitores', (req, res) => {
    // http://localhost:3000/arqweb/productos/monitores?tipo=Led-22Inch&marca=Samsung
    // http://localhost:3000/arqweb/productos/monitores/
   //console.log(req.query);
   //let prods = [];
   //var arrayLength = _products.length;
   //if(req.query.marca == null && req.query.tipo == null ){ //es un get a toda la categoria monitores
   //    for (var i = 0; i < arrayLength; i++) {
   //        if( _products[i].Categoria == 'Monitor'){
   //            prods.push(_products[i]);
   //        }
   //    }
   //}else{//utilizo algun fitro con query param
   //    for (var i = 0; i < arrayLength; i++) {
   //        if((_products[i].Marca == req.query.marca || _products[i].Tipo == req.query.tipo) &&  _products[i].Categoria == 'Monitor'){
   //            prods.push(_products[i]);
   //        }
   //    }
   //}
    var resultArray = [];
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      var cursor = db.collection('Monitor').find();
      cursor.forEach(function(doc, err) {
        assert.equal(null, err);
        resultArray.push(doc);
      }, function() {
        db.close();
        if(resultArray) {
            res.json(resultArray);
        } else {
            res.status(404).end();
        }
      });
    });
  });

/*
//borrar un monitor por id
app.delete('/arqweb/productos/monitores/:id', (req, res) => {
   // http://localhost:3000/arqweb/productos/monitores/8
    console.log(req.params);
    var arrayLength = _products.length;
    for (var i = 0; i < arrayLength; i++) {
        if(_products[i].id == req.params.id  &&  _products[i].Categoria == 'Monitor'){
            _products.splice(_products[i], 1);
            res.json(_products);
        }
    }
    res.status(204).end();
});
*/

//DELETE de un monitor por id utilizando mongoDB
app.delete('/arqweb/productos/monitores/:id', (req, res) => {
 let idProducto = req.params.id
  p.findbyId(idProducto, (err, product) => {
      if (err) res.status(500).send({message: 'Error al borrar el producto: ${err}'})

      p.remove(err => {
          if (err) res.status(580).send({message: 'Error al borrar el producto: ${err}'})
          res.status(200).send({message: 'El Producto ha sido eliminado'})
      })
    })
})

//DELETE de un monitor por id utilizando mongoDB
app.delete('/arqweb/productos/monitores/:id', (req, res) => {
    let idProducto = req.params.id
    let update = req.body

     p.findbyIdandUpdate(idProducto, update, (err, productUpdated) => {
         if (err) res.status(500).send({message: 'Error al actualizar el producto: ${err}'})
   
         res.status(200).send({message: 'El Producto ha sido Actualizado: ${err}'})
         })
       })

// Submit de monitores
app.post('/arqweb/productos/monitores', (req, res) => {
    
    var nuevoMonitor = req.body;
    nuevoMonitor.Categoria = 'Monitor';
    console.log(nuevoMonitor);
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        db.collection('Monitor').insertOne(nuevoMonitor,function(error, result){
            assert.equal(null, error);
            console.log('Insertado');
            db.close();
        });
    
    });
    _products.push(req.body);
    res.status(201).send(req.body);
});

// Update de monitores
app.put('/arqweb/productos/monitores/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    var arrayLength = _products.length;
    for (var i = 0; i < arrayLength; i++) {
        if(_products[i].id == req.params.id  &&  _products[i].Categoria == 'Monitor'){
            _products.splice(_products[i], 1);//borro el registro viejo
            _products.push(req.body);//persisto el nuevo, faltaria validar que esten los campos completos en el json del request...
            res.json(_products);
        }
    }
    res.status(204).end();
});


//-----------------------------------------------Placas de Videos---------------------------------------------------


// Obtener placa de video por su marca y/o ram
app.get('/arqweb/productos/video', (req, res) => {
    // http://localhost:3000/arqweb/productos/video?marca=nvidia&ram=12000
    // http://localhost:3000/arqweb/productos/video/
    console.log(req.query);
    let prods = [];
    var arrayLength = _products.length;
    if(req.query.marca == null && req.query.ram == null ){ //es un get a toda la categoria placa video
        for (var i = 0; i < arrayLength; i++) {
            if( _products[i].Categoria == 'Placas de Video'){
                prods.push(_products[i]);
            }
        }
    }else{//utilizo algun fitro con query param
        for (var i = 0; i < arrayLength; i++) {
            if((_products[i].Marca == req.query.marca || _products[i].Tipo == req.query.tipo) &&  _products[i].Categoria == 'Placa de Video'){
                prods.push(_products[i]);
            }
        }
    }
    if(prods) {
        res.json(prods);
    } else {
        res.status(404).end();
    }
});

//borrar una placa de video por su id
app.delete('/arqweb/productos/video/:id', (req, res) => {
   // http://localhost:3000/arqweb/productos/video/6
    console.log(req.params);
    var arrayLength = _products.length;
    for (var i = 0; i < arrayLength; i++) {
        if(_products[i].id == req.params.id  &&  _products[i].Categoria == 'Placa de Video'){
            _products.splice(_products[i], 1);
            res.json(_products);
        }
    }
    res.status(204).end();
});

// Submit de Placa de Video
app.post('/arqweb/productos/video', (req, res) => {
    var nuevoVideo = req.body;
    nuevoVideo.Categoria = 'Placa de Video';
    console.log(nuevoVideo);
    _products.push(req.body);
	//codigo de respuesta 201 CREATED, indica que se creo de manera correcta
    res.status(201).send(req.body);
});

// Update de Placas de Video
app.put('/arqweb/productos/video/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    var arrayLength = _products.length;
    for (var i = 0; i < arrayLength; i++) {
        if(_products[i].id == req.params.id  &&  _products[i].Categoria == 'Placa de Video'){
            _products.splice(_products[i], 1);//borro el registro viejo
            _products.push(req.body);//persisto el nuevo, faltaria validar que esten los campos completos en el json del request...
            res.json(_products);
        }
    }
	//devuelvo un 204 no content, no hay datos para devolver 
    res.status(204).end();
});

//-----------------------------------------------Procesadores---------------------------------------------------

// Obtener un procesador por su precio de manera desc y tambien su marca

app.get('/arqweb/productos/monitores', (req, res) => {
    // http://localhost:3000/arqweb/productos/procesador?precio=desc&marca=intel
    // http://localhost:3000/arqweb/productos/procesador/
    console.log(req.query);
    let prods = [];
    var arrayLength = _products.length;
    if(req.query.precio == null && req.query.marca == null ){ //es un get a toda la categoria procesadores
        for (var i = 0; i < arrayLength; i++) {
            if( _products[i].Categoria == 'Procesador'){
                prods.push(_products[i]);
            }
        }
    }else{//utilizo algun fitro con query param
        for (var i = 0; i < arrayLength; i++) {
            if((_products[i].Marca == req.query.marca || _products[i].Tipo == req.query.tipo) &&  _products[i].Categoria == 'Procesador'){
                prods.push(_products[i]);
            }
        }
    }
    if(prods) {
        res.json(prods);
    } else {
        res.status(404).end();
    }
});

//borrar un procesador por id
app.delete('/arqweb/productos/procesador/:id', (req, res) => {
   // http://localhost:3000/arqweb/productos/procesador/3
    console.log(req.params);
    var arrayLength = _products.length;
    for (var i = 0; i < arrayLength; i++) {
        if(_products[i].id == req.params.id  &&  _products[i].Categoria == 'Procesador'){
            _products.splice(_products[i], 1);
            res.json(_products);
        }
    }
    res.status(204).end();
});

// Submit de Procesadores
app.post('/arqweb/productos/procesador', (req, res) => {
    
    var nuevoProcesador = req.body;
    nuevoProcesador.Categoria = 'Procesador';
    console.log(nuevoProcesador);
    _products.push(req.body);
    res.status(201).send(req.body);
});

// Update de Procesador
app.put('/arqweb/productos/procesador/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    var arrayLength = _products.length;
    for (var i = 0; i < arrayLength; i++) {
        if(_products[i].id == req.params.id  &&  _products[i].Categoria == 'Procesador'){
            _products.splice(_products[i], 1); //borro el registro viejo
            _products.push(req.body);//persisto el nuevo, faltaria validar que esten los campos completos en el json del request...
            res.json(_products);
        }
    }
    res.status(204).end();
});

// start server
app.listen(process.env.PORT || 3000, function () {
    console.log('API andando con express...');
});