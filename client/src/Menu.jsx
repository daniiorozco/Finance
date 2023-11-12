import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './Menu.css'


const Menu = ()=>{

  return(
    <>
    <main className="container-fluid">
      <div className='row d-flex botones align-items-center'>
        <div className=' d-flex flex-column align-items-center '>   
        <Button className=' mt-3 mb-3 col-6 fs-5 boton-menu ' variant="primary"><Link className='text-light link-prestamos' to='/Prestamos'>Prestamos</Link></Button>
        <Button className=' mt-3 mb-3 col-6 fs-5 boton-menu ' variant="primary"><Link className='text-light link-prestamos' to='/Cuotas'>Cuotas</Link></Button>
        <Button className=' mt-3 mb-3 col-6 fs-5 boton-menu ' variant="primary"><Link className='text-light link-prestamos' to='/Clientes'>Clientes</Link></Button>
        <Button className=' mt-3 mb-3 col-6 fs-5 boton-menu ' variant="primary"><Link className='text-light link-prestamos' to='/Cobro'>Cobro</Link></Button>
        </div>
      </div>
    </main>
    </>
  )
}

export default Menu;