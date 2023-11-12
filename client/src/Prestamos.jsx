import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Buscador from "./Buscador";
import TablaPrestamos from './TablaPrestamos';

const Prestamos = ()=>{

    return(
        <>
        <main className="container-fluid">
            <div className='row d-flex '>
                <div className=' d-flex flex-column align-items-center '>
                <Button className=' mt-3 mb-3 col-6  boton-menu ' variant="primary"><Link className='text-light link-prestamos' to='/NuevoPrestamo'>Nuevo Prestamo</Link></Button>
                </div>
            </div>
            <div className='row d-flex justify-content-center'>
                <Buscador />
            </div>
            <div className='row d-flex mt-4'>
                <TablaPrestamos /> 
            </div>
        </main>
        </>
    )
}

export default Prestamos;