import Button from 'react-bootstrap/Button';
import { FaSearch } from "react-icons/fa";


const Buscador = ()=>{

    return(
        <>
        <div className='col-9 bg-primary-subtle rounded p-0'>
        <input className='rounded p-1 bg-primary-subtle border border-0' type="text" name="" id="" placeholder='Ingrese el nombre' />
        <Button variant=""><FaSearch /></Button>
        </div>
       
        </>
    )
}

export default Buscador;