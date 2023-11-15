import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './index.css'
import { Header } from '../../components/Header';


const Menu = ()=>{

  const [menus,setMenus] = useState([
    'Prestamos','Cuotas','Clientes','Cobro'
  ])



  return(
    <>
    <Header />
    <main className="flex w-full items-center justify-center">
      <div className='flex flex-col sm:flex-row'>
        {menus.map(menu => (
          <button 
          key={menu}
          className='m-4 p-5 rounded-md bg-sky-300 hover:bg-sky-500 text-lg' 
          >
            <Link className='link-prestamos' to={`/${menu}`}>{menu}</Link></button>
        ))}  
      </div>
    </main>
    </>
  )
}

export default Menu;