import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
    Link
  } from "react-router-dom";

const VerProductos = () => {

    const [listProductos, setlistProductos ] = useState([]);

    const getAllProducts = async () => {
        try{
            const productos = await axios.get('http://localhost:8080/api/productos')
            console.log("productos", productos)
            setlistProductos(productos.data.productosList);

        } catch(err){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'al traer los datos'
            })
        }
    }

    const deleteProducto = async (id) => {
        try{
            const producto = await axios.delete(`http://localhost:8080/api/productos/delete/${id}`);
            console.log("producto", producto);
            getAllProducts();
        }catch(err){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'al eliminar el registro'
            })
        }
    }

    useEffect(() => {
        getAllProducts();
      },[]);

    return (
        <div>
            <h1>Productos</h1>

            <table className="grillaProductos">
                <tr>
                    <th>Titulo</th>
                    <th>Precio</th>
                    <th>Descripción </th>
                    <th>Acción</th>
                </tr>
                {listProductos?.map((producto)=>{
                    return <tr key={producto._id} ><td><Link to={`/detalle-producto/${producto._id}`}>{producto.titulo}</Link></td><td>{producto.precio}</td><td>{producto.descripcion}</td><td><button onClick={()=> deleteProducto(producto._id)}>eliminar</button><Link to={`/actualizar-producto/${producto._id}`}>Editar</Link></td></tr>
                })}
            </table>
            
        </div>
    );
}

export default VerProductos;