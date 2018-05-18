
/*

 Creacion del Servidor nodeJS
 y de la conexion a la base de datos mongoDB

*/

//dependencias que necesitamos
var express = require("express"), 
app = express(),
bodyParser  = require("body-parser"),
methodOverride = require("method-override");
http = require("http"),
server = http.createServer(app),
mongoose = require('mongoose');
var productos = require('./routes/productos');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router(); //creamos una instancia

//declaramos las rutas con app.route(nombre_de_la_ruta), seguido del verbo .get(), .post(), etc…
//en este caso solo recibe peticion GET del browser, imprime frase para probar
router.get('/', function(req, res) { 
    res.send("Hello World....I´m Testing!"); 
    });
    app.use(router);
    //var mongoose = require('mongoose');
       mongoose.connect('mongodb://localhost/test', function(error){
          if(error){
             throw error; 
             console.log('ERROR: connecting to Database. ' + err);
          }else{
             console.log('Conectado a MongoDB!!');
          }
       });
       app.listen(3000, function() {
        console.log("Node server running on http://localhost:3000");
      });
      var ProductosSchema = mongoose.Schema({
        nombre: {type: String, required: true},
        categoria: {type: String, required: true},
        desc: {type: String, required: true},
        precio: {type: Number, required: true}
     });
     var ProductoModel = mongoose.model('Productos', ProductosSchema);
     productos.setModel(ProductoModel);
      
     app.get('/productos', productos.index);
     app.get('/productos/create', productos.create);
     app.post('/productos', productos.store);
     app.get('/productos/:id', productos.show);
     app.get('/productos/:id/edit', productos.edit);
     app.put('/productos/:id', productos.update);
     app.delete('/productos/:id', productos.destroy);







