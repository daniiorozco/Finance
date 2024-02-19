import Button from 'react-bootstrap/Button';
import { FaSearch } from "react-icons/fa";



const Buscador = ()=>{

    return(
        <>
        <div className=''>
        <input className='' type="text" name="" id="" placeholder='Ingrese el nombre' />
        <Button variant=""><FaSearch /></Button>
        </div>
       
        </>
    )
}

export default Buscador;