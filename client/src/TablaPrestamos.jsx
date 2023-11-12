import DataTable from "react-data-table-component";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";

const url = 'http://localhost:8000/prestamos';

const TablaPrestamos = ()=>{

    //estados
    const [prestamos,setPrestamos] = useState([]);

    useEffect(()=>{
        axios.get(url).then((response)=>{
            setPrestamos(response.data);
        });
    },[]);


    // configuracion de la data-table
    const columnas = [
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'Prestamo',
            selector: row => row.cantidad_prestada,
            sortable: true
        },
        {
            name: 'Acciones',
            cell: (row) => (
                <>
                    <span  className='btn btn-primary'><AiTwotoneEdit /></span>{'     '}
                    <span  className='btn btn-danger'><AiTwotoneDelete /></span>
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

    return(
        <>

            <div>
            <DataTable
          columns={columnas}
          data={prestamos}
          title="Lista de Prestamos"
          pagination
          paginationComponentOptions={PaginacionOpciones} />
            </div>
        </>
    )
}

export default TablaPrestamos;