const express    = require('express');
const bodyParser = require('body-parser');
const moment     = require('moment');
const app = express();

var _products = [

    {id: 1, Categoria: 'Monitor', Tipo: Led-22Inch, Marca: Samsung, Precio: 6500 },
    {id: 2, Categoria: 'Placa de Video', Tipo:PCI-E, Marca: Asus, Precio: 23500 },
	{id: 3, Categoria: 'Procesador', Tipo: i7-Socket-1150, Marca: Intel, Precio: 13500 },
	{id: 4, Categoria: 'Placa Madre', Tipo: ATX, Marca: Asus, Precio: 3500 },
	{id: 5, Categoria: 'Memoria', Tipo: DDR4-16GB, Marca: Corsair, Precio: 2500 },
	{id: 6, Categoria: 'Almacenamiento', Tipo: SSD256MB, Marca: Kingston, Precio: 11500 },
	{id: 7, Categoria: 'Almacenamiento', Tipo: SSD512MB, Marca: Corsair, Precio: 14500 },
	{id: 8, Categoria: 'Almacenamiento', Tipo: HD1TB, Marca: Seagate, Precio: 6500 },
	{id: 9, Categoria: 'Gabinete', Tipo: ATX, Marca: Thermatalke, Precio: 3500 },
	{id: 10, Categoria: 'Gabinete', Tipo: ATX, Marca: Thermatalke, Precio: 5500 },

];

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
        list.push(`<li>Categoria: ${p.categoria}</li>`);
		list.push(`<li>Tipo: ${p.tipo}</li>`);
		list.push(`<li>Marca: ${p.marca}</li>`);
		list.push(`<li>Precio: ${p.precio}</li>`);
		
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

// Obtener monitor por el tipo
app.get('/api/productos/monitores/:tipo', (req, res) => {

    let pro = _products.find(p => p.tipo == req.params.tipo);
    if(pro) {
        res.json(pro);
    } else {
        res.status(404).end();
    }
});

// Obtener monitor por precio
app.get('/api/productos/monitores/:precio', (req, res) => {

    let pro = _products.find(p => p.precio == req.params.precio);
    if(pro) {
        res.json(pro);
    } else {
        res.status(404).end();
    }
});

//borrar un monitor por id
app.delete('/api/productos/monitores/:id', (req, res) => {
    _products = _products.filter(p => p.id != req.params.id);
    res.status(204).end();
});

// Submit de monitores
app.post('/arqweb/productos/monitores', (req, res) => {
    _products.push(req.body);
    res.status(201).send(req.body);
});

// Obtener Placa de video por id
app.get('/api/productos/video/:id', (req, res) => {

    let pro = _products.find(p => p.id == req.params.id);
    if(pro) {

        res.json(pro);

    } else {

        res.status(404).end();
    }
});

// Obtener teclado por id
app.get('/api/productos/teclado/:id', (req, res) => {

    let pro = _products.find(p => p.id == req.params.id);
    if(pro) {

        res.json(pro);

    } else {

        res.status(404).end();
    }
});

// Obtener mouse por id
app.get('/api/productos/mouse/:id', (req, res) => {

    let pro = _products.find(p => p.id == req.params.id);
    if(pro) {

        res.json(pro);

    } else {

        res.status(404).end();
    }
});

// Obtener procesador por id
app.get('/api/productos/procesador/:id', (req, res) => {

    let pro = _products.find(p => p.id == req.params.id);
    if(pro) {

        res.json(pro);

    } else {

        res.status(404).end();
    }
});

// Obtener motherboard por id
app.get('/api/productos/mother/:id', (req, res) => {

    let pro = _products.find(p => p.id == req.params.id);
    if(pro) {

        res.json(pro);

    } else {

        res.status(404).end();
    }
});

// Obtener memorias ram por id
app.get('/api/productos/memoria/:id', (req, res) => {

    let pro = _products.find(p => p.id == req.params.id);
    if(pro) {

        res.json(pro);

    } else {

        res.status(404).end();
    }
});

// Obtener los dispositivos de almacenamiento por id
app.get('/api/productos/almacenamiento/:id', (req, res) => {

    let pro = _products.find(p => p.id == req.params.id);
    if(pro) {

        res.json(pro);

    } else {

        res.status(404).end();
    }
});

// Obtener gabinetes por id
app.get('/api/productos/gabinete (req, res) => {

    let pro = _products.find(p => p.id == req.params.id);
    if(pro) {

        res.json(pro);

    } else {

        res.status(404).end();
    }
});

// Obtener gabinetes por precio
app.get('/api/productos/gabinete (req, res) => {

    let pro = _products.find(p => p.precio == req.params.precio);
    if(pro) {

        res.json(pro);

    } else {

        res.status(404).end();
    }
});


// Submit de placas de video
app.post('/arqweb/productos/video', (req, res) => {
    _products.push(req.body);
    res.status(201).send(req.body);
});

// Submit de teclados
app.post('/arqweb/productos/teclado', (req, res) => {
    _products.push(req.body);
    res.status(201).send(req.body);
});

// Enviar mouse
app.post('/arqweb/productos/mouse', (req, res) => {
    _products.push(req.body);
    res.status(201).send(req.body);
});

// Submit de procesadores
app.post('/arqweb/productos/procesador', (req, res) => {
    _products.push(req.body);
    res.status(201).send(req.body);
});

// Submit de motherboards
app.post('/arqweb/productos/motherboard', (req, res) => {
    _products.push(req.body);
    res.status(201).send(req.body);
});

// Submit de memorias ram
app.post('/arqweb/productos/memoria', (req, res) => {
    _products.push(req.body);
    res.status(201).send(req.body);
});

// Submit de dispositivos de almacenamiento
app.post('/arqweb/productos/almacenamiento', (req, res) => {
    _products.push(req.body);
    res.status(201).send(req.body);
});

// Hacer un Submit de todos los gabinetes
app.post('/arqweb/productos/gabinete', (req, res) => {
    _products.push(req.body);
    res.status(201).send(req.body);
});


// start server
app.listen(process.env.PORT || 3000, function () {

    console.log('API andando con express...');
});


