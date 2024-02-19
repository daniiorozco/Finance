//import {useRoutes} from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import { Menu } from "../pages/Menu";
import Customers from '../pages/Customers';
import { NewCustomer } from "../pages/NewCustomer";
import { EditCustomer } from "../pages/EditCustomer";



export const AppRoutes = ()=>{


    return(
        <>
         <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/clientes" element={<Customers />} />
          <Route path="/nuevoCliente" element={<NewCustomer />} />
          <Route path="/editarCliente" element={<EditCustomer />}/>
        </Routes>
        </>
    )
}