import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import Swal from 'sweetalert2'
import {
    useParams
  } from "react-router-dom";
import { useHistory } from "react-router-dom";


const ProductoSchema = Yup.object().shape({
    titulo: Yup.string()
      .min(2, 'Debe tener minimo 2 caracteres')
      .required('Required'),
    precio: Yup.number()
      .min(1, 'debe ser mayor que 0')
      .required('Required'),
    descripcion: Yup.string()
      .min(2, 'Debe tener minimo 2 caracteres')
      .required('Required'),
  });

const CrearProducto = () => {


    const { id } = useParams();

    const [producto, setProducto] = useState()

    const history = useHistory();

    const getProducto = async () => {
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

   

    const createProduct = async (values) => {
        try{
            const create = await axios.post('http://localhost:8080/api/productos/new',values);

            Swal.fire(
                'Good job!',
                'Se ha creado el producto',
                'success'
              )


              history.push("/");
            // console.log("create:", create.statusText)

        }catch(err){
             
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data.error.message
            })
            // console.log("prueba:", err.response.data.error.message)
        }
    }

    const actualizarProducto = async (values) => {
        try{
            const create = await axios.put(`http://localhost:8080/api/productos/update/${id}`,values);

            Swal.fire(
                'Good job!',
                'Se ha creado el producto',
                'success'
              )

              
            // console.log("create:", create)

        }catch(err){
             
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data.error.message
            })
            // console.log("prueba:", err.response.data.error.message)
        }
    }
    
    useEffect(() => {
        id && getProducto();
    },[]);

    return (
        <div className="card">
        {id?<h1>Modificar Producto</h1>: <h1>Crear Producto</h1>}
        
        <Formik
            enableReinitialize
            initialValues={{
                titulo: producto?.titulo,
                precio: producto?.precio,
                descripcion: producto?.descripcion
            }}
            validationSchema={ProductoSchema}
            onSubmit={values => {
                id ? actualizarProducto(values):createProduct(values)
            }}
            >
            {({ errors, touched }) => (
                <Form>
                <label htmlFor="titulo">Titulo</label>
                <Field name="titulo" />
                {errors.titulo && touched.titulo ? (
                    <div className="error">{errors.titulo}</div>
                ) : null}
                <label htmlFor="precio">Precio</label>
                <Field name="precio" type="number" />
                {errors.precio && touched.precio ? (
                    <div className="error">{errors.precio}</div>
                ) : null}
                <label htmlFor="descripcion">Descripcion</label>
                <Field name="descripcion" />
                {errors.descripcion && touched.descripcion ? <div className="error">{errors.descripcion}</div> : null}
                <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
        </div>
    );
}

export default CrearProducto;