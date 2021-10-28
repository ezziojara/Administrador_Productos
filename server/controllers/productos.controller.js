const Productos = require('../models/productos.model');

module.exports.getAllProductos = async (req, res) => {
    try{
        
        const productosList = await Productos.find();
        return res.json({ productosList });
    }catch(err){
        return res.status(500).json({error: err});
    }
};

module.exports.getOneProducto = async (req, res) => {
    try{
        const { id } = req.params;
        const producto = await Productos.findById(id);
        return res.json({ producto });

    }catch(err){
        return res.status(500).json({error: err});
    }
}

module.exports.createProducto = async (req, res) => {
    try{
        
        const { body } = req;
        const newProducto = await Productos.create(body)
        
        return res.json({ newProducto })

    }catch(err){
        return res.status(500).json({error: err});
    }
}

module.exports.UpdateProducto = async (req, res) => {
    try{
        const { id } = req.params;
        const updateProducto =  await Productos.findByIdAndUpdate({_id: id},req.body,{new: true});
        return res.json({msg: 'Se ha actualizado correctamente', updateProducto});

    }catch(err){
        return res.status(500).json({error: err});
    }
}

module.exports.deleteProducto = async (req, res) => {
    try{
        const { id } = req.params;
        const deleteProducto =  await Productos.deleteOne({_id: id});
        return res.json({msg: 'Se ha borrado joke exitosamente', producto: deleteProducto});
    }catch(err){
        return res.status(500).json({error: err});
    }
}