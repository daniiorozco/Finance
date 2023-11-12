import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import axios from "axios";
import { useRef } from 'react';

const url = 'http://localhost:8000/clientes';
const urlPrestamo = 'http://localhost:8000/prestamos';

const AddPrestamo = () => {

    const [clientes, setClientes] = useState([]);
    const [prestamo, setPrestamo] = useState({});
    const [error, setError] = useState(null);

    const inputIdCliente = useRef(null);
    const inputPrestamo = useRef(null);
    const inputInteres = useRef(null);
    const totalAdeudado = useRef(null);


    useEffect(() => {
        axios.get(url).then((response) => {
            setClientes(response.data)
        }).catch(error =>{
            setError(error);
            console.log(error);
        });
    }, []);




    let handleChange = ({ target: { name, value } }) => {
        setPrestamo({ ...prestamo, [name]: value });
    }

    let { id_cliente, cantidad_prestada, total_deuda, interes } = prestamo;
    console.log(prestamo);

    let handleValidarPrestamoEInteres = (prestamo, interes) => {
        if (prestamo !== null && interes !== null && !isNaN(prestamo) && !isNaN(interes)) {
            let totalInteres = (prestamo * interes) / 100;
            let totalDeuda = (parseFloat(prestamo) + parseFloat(totalInteres));
            totalAdeudado.current.value = Math.floor(totalDeuda);
        } else {
            console.log("Ingrese los datos correctos");
        }
    }

    let handleCalcular = () => {
        totalAdeudado.current.value = '';

        let prestamo = inputPrestamo.current.value;
        let interes = inputInteres.current.value;

        handleValidarPrestamoEInteres(prestamo, interes)
    }

    let handleCrearPrestamo = () => {

        axios.post(urlPrestamo,
            prestamo
        ).then((response) => {
            setPrestamo(response.data)
        }).catch(error =>{
            setError(error);
            console.log(error);
        });
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        handleCrearPrestamo();
    }


    return (
        <>
            <main className="container-fluid">
                <div className='row d-flex '>
                    <div className='d-flex flex-column align-items-center'>
                        <h2 className='mt-4'>Ingresar Nuevo Prestamo</h2>

                        <Form className='mt-4' onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="id_cliente">
                                <Form.Select onChange={handleChange} name="id_cliente" value={id_cliente} ref={inputIdCliente}>
                                    <option value="0">seleccione</option>
                                    {clientes.map((cliente) => (
                                        <option key={cliente.id} value={cliente.id}>{cliente.nombre} {cliente.apellido}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="prestamo">
                                <Form.Label>Ingrese el prestamo</Form.Label>
                                <Form.Control type="number" autoComplete="off" value={cantidad_prestada} placeholder="$ Prestamo" name='cantidad_prestada' ref={inputPrestamo} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="interes">
                                <Form.Label>Ingrese el interes</Form.Label>
                                <Form.Control type="number" autoComplete="off" value={interes} placeholder="%" name='interes' ref={inputInteres} onChange={handleChange} />
                            </Form.Group>
                            <input className='btn btn-primary' type="button" value="Calcular" onClick={handleCalcular} />
                            <Form.Group className="mb-3" controlId="total_deuda">
                                <Form.Label >Total del prestamo con el interes:</Form.Label>
                                <Form.Control type="number" autoComplete="off" value={total_deuda} disabled name='total_deuda' ref={totalAdeudado} onChange={handleChange} />
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

export default AddPrestamo;