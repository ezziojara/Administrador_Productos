import React, { useEffect, useState } from 'react';
import {
    useParams
  } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

const DetalleProducto = () => {

    const { id } = useParams();

    const [producto, setProducto] = useState()

    const getProducto = async (id) => {
        try{
            const product = await axios.get(`http://localhost:8080/api/productos/${id}`)
            console.log("product:", product)
            setProducto(product.data.producto);

        }catch(err){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'al traer los datos'
            })
        }
    }

    useEffect(()=>{
        getProducto(id);
    },[]);

    return(
        <div>
            <h1>Detalle Producto</h1>
            <p>Titulo:{producto?.titulo}</p>
            <p>Precio:{producto?.precio}</p>
            <p>Precio:{producto?.descripcion}</p>
        </div>
    );
}

export default DetalleProducto;