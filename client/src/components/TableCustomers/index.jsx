import DataTable from "react-data-table-component";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const url = 'http://localhost:8000/clientes/';

const TablaClientes = () => {

    //estados
    const [error, setError] = useState(null);
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState({});
    const [listUpdateCliente, setListUpdateCliente] = useState(false);

    const getClientes = () => {
        axios.get(url).then((response) => {
            setClientes(response.data);
        }).catch(error =>{
            setError(error);
            console.log(error);
        });
    }

    useEffect(() => {
        
        getClientes();
        setListUpdateCliente(false);
    }, [listUpdateCliente]);

    let handleEditarCliente = (id) => {
        axios.put(url + id, cliente).then((response) => {
            setCliente(response.data)
        }).catch(error =>{
            setError(error);
            console.log(error);
        });
        setCliente({});
        setListUpdateCliente(true);
        handleClose();
    }

    // metodo para borrar 
    const handleBorrar = (id) => {
        axios.delete(url + id).then((response)=>{
            console.log(response.data);
        }).catch(error =>{
            setError(error);
            console.log(error);
        });
        
        setListUpdateCliente(true);
        handleCloseDelete();
    }

    // configuracion de la data-table
    const columnas = [
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'Apellido',
            selector: row => row.apellido,
            sortable: true
        },
        {
            name: 'Acciones',
            cell: (row) => (
                <>
                    <span onClick={() => { seleccionarCliente(row); handleShow() }} className='text-blue-600'><AiTwotoneEdit /></span>{'     '}
                    <span onClick={() => { seleccionarCliente(row); handleShowDelete() }} className='text-red-600'><AiTwotoneDelete /></span>
                </>
            ),

            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }

    ];
    const PaginacionOpciones = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    }

    // metodo para guardar los datos de la venta
    const seleccionarCliente = (cliente) => {
        setCliente(
            {
                id: cliente.id,
                nombre: cliente.nombre,
                apellido: cliente.apellido,
                dni: cliente.dni,
                direccion: cliente.direccion
            }
        )

    }

    //modal editar
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // modal eliminar
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    // guardo cada dato en el objeto
    const handleChange = ({ target: { name, value } }) => {
        setCliente({ ...cliente, [name]: value })
    }


    return (
        <>
            <div>
                <DataTable
                    columns={columnas}
                    data={clientes}
                    title="Lista de Prestamos"
                    pagination
                    paginationComponentOptions={PaginacionOpciones} />
            </div>

            <Modal show={show} onHide={handleClose} backdrop="static" >
                <Modal.Header closeButton>
                    <Modal.Title>Editar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >

                        <Form.Group className="mb-3" >
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={cliente.nombre}
                                onChange={handleChange}
                                id='nombre'
                                name='nombre'
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                        >
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                value={cliente.apellido}
                                onChange={handleChange}
                                id='apellido'
                                name='apellido'
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                        >
                            <Form.Label>DNI</Form.Label>
                            <Form.Control
                                type="text"
                                value={cliente.dni}
                                onChange={handleChange}
                                id='dni'
                                name='dni'
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                        >
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                value={cliente.direccion}
                                onChange={handleChange}
                                id='direccion'
                                name='direccion'
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose} className='btn btn-danger' type='submit' >Cerrar</button>
                    <button onClick={() => handleEditarCliente(cliente.id)} className='btn btn-primary' type='submit' >Guardar</button>
                </Modal.Footer>
            </Modal>

            {/* modal eliminar */}
            <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    
                        <div><p>
                            Esta seguro que desea <b>Eliminar</b> al cliente/a <b>{cliente.nombre} {cliente.apellido}</b> 
                            </p></div>
                       
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleCloseDelete} className=' btn btn-danger' type='submit' >Cerrar</button>
                    <button onClick={() => handleBorrar(cliente.id)} className=' btn btn-primary' type='submit' >Eliminar</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TablaClientes;