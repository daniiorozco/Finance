import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import axios from "axios";


const urlCliente = 'http://localhost:8000/clientes';

const AddCliente = () => {

    const [validated, setValidated] = useState(false);
    let navigate = useNavigate()
    const [cliente, setCliente] = useState({
        nombre : '',
        apellido : '',
        dni : '',
        direccion : ''
    });

    let handleChange = ({ target: { name, value } }) => {
        setCliente({ ...cliente, [name]: value });
    }

    let { nombre, apellido, dni, direccion } = cliente;


    let handleCrearCliente = () => {

        axios.post(urlCliente,
            cliente
        ).then((response) => {
            setCliente(response.data)
            navigate('/Clientes')
        }).catch(error =>{
            setError(error);
            console.log(error);
        });
    }


    let handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);
        e.preventDefault();
        handleCrearCliente();
    }
    console.log(cliente);
    return (
        <>
            <main className="container-fluid">
                <div className='row d-flex '>
                    <div className='d-flex flex-column align-items-center'>
                        <h2 className='mt-4'>Ingresar Nuevo Cliente</h2>

                        <Form className='mt-4' noValidate validated={validated} onSubmit={handleSubmit}>

                            <Form.Group className="mb-3" controlId="nombre">
                                <Form.Label>Ingrese el Nombre</Form.Label>
                                <Form.Control type="text" autoComplete="off" required value={nombre} placeholder="nombre" name='nombre' onChange={handleChange}  />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="apellido">
                                <Form.Label>Ingrese el Apellido</Form.Label>
                                <Form.Control type="text" autoComplete="off" required value={apellido} placeholder="apellido" name='apellido' onChange={handleChange}  />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="dni">
                                <Form.Label >Ingrese el DNI:</Form.Label>
                                <Form.Control type="text" autoComplete="off" required value={dni} name='dni' placeholder='DNI' onChange={handleChange}  />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="direccion">
                                <Form.Label >Ingrese la Dirección:</Form.Label>
                                <Form.Control type="text" autoComplete="off" required value={direccion} name='direccion' placeholder='dirección' onChange={handleChange}  />
                            </Form.Group>
                            <div className='d-flex justify-content-center'>
                                <Button variant="primary" type="submit" name='guardar' >
                                    Guardar
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </main>

        </>
    )
}

export default AddCliente;