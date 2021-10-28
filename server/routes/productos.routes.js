const {getAllProductos, getOneProducto, createProducto, UpdateProducto, deleteProducto} = require('../controllers/productos.controller');

module.exports = (app) => {
    app.get('/api/productos',getAllProductos);
    app.get('/api/productos/:id',getOneProducto);
    app.post('/api/productos/new',createProducto);
    app.put('/api/productos/update/:id',UpdateProducto);
    app.delete('/api/productos/delete/:id',deleteProducto);
}