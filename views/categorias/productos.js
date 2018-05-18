var Producto;
exports.setModel = function(modelo){
   Producto = modelo;
};
exports.index = function(req, res){
    Producto.find({}, function(error, productos){
        if(error){
           res.send('Ha surgido un error.');
        }else{
           res.render('productos/index', {
              productos: productos
           });
        }
     })
  };
exports.create = function(req, res){
    res.render('productos/save', {
        put: false,
        action: '/productos/',
        personaje: new Producto({
           nombre: '',
           categoria: '',
           descripcion: '',
           precio: ''
        })
     });
  };
exports.store = function(req, res){
    var producto = new Produco({
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion,
        precio: req.body.precio
     });
     producto.save(function(error, documento){
        if(error){
           res.send('Error al intentar guardar el producto');
        }else{ 
           res.redirect('/productos');
        }
     });
  };
exports.show = function(req, res){
    Producto.findById(req.params.id, function(error, documento){
        if(error){
           res.send('Error al intentar ver el producto.');
        }else{
           res.render('productos/show', {
              producto: documento
           });
        }
     });
  };
exports.edit = function(req, res){
    Producto.findById(req.params.id, function(error, documento){
        if(error){
           res.send('Error al intentar ver el producto.');
        }else{
           res.render('productos/save', {
              put: true,
              action: '/productos/' + req.params.id,
              producto: documento
           });
        }
     });
  };
exports.update = function(req, res){
        Producto.findById(req.params.id, function(error, documento){
           if(error){
              res.send('Error al intentar modificar el producto.');
           }else{
              var producto = documento;
              producto.nombre = req.body.nombre;
              producto.categoria = req.body.categoria;
              producto.descripcion = req.body.descripcion;
              producto.precio = req.body.precio;
              producto.save(function(error, documento){
                 if(error){
                    res.send('Error al intentar guardar el producto.');
                 }else{ 
                    res.redirect('/productos');
                 }
              });
           }
        });
     };
exports.destroy = function(req, res){
    Producto.remove({_id: req.params.id}, function(error){
        if(error){
           res.send('Error al intentar eliminar el producto.');
        }else{ 
           res.redirect('/productos');
        }
     });
  };
};