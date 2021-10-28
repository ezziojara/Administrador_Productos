const mongoose = require('mongoose');

const ProductosSchema = new mongoose.Schema({
    titulo:{
        type: String,
        min: [2, 'debe tener al menos 2 letras'],
        required: [true, 'debe ingresar titulo']
    },
    precio: {
        type: Number,
        min: [1, 'debe ser mayor que 0'],
        required: [true, 'debe ingresar precio']
    },
    descripcion:{
        type: String,
        min: [2, 'debe tener al menos 2 letras'],
        required: [true, 'debe ingresar descripcion']
    }
}, {timestamps: true});

const Productos = mongoose.model('productos',ProductosSchema);
module.exports = Productos;