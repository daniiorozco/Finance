import { Header } from '../../components/Header';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Buscador from "../../components/Search";
import TablaPrestamos from '../../components/TableLoan';
import { FcPlus } from "react-icons/fc";

const Prestamos = ()=>{

    return(
        <>
        <Header />
        <main className="">
            <div className=''>
                <div className=''>
                <Button className='' variant=""><FcPlus /><Link className='' to='/NuevoPrestamo'>Nuevo Prestamo</Link></Button>
                </div>
            </div>
            <div className=''>
                <Buscador />
            </div>
            <div className=''>
                <TablaPrestamos /> 
            </div>
        </main>
        </>
    )
}

export default Prestamos;