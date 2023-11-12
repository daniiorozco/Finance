import { Routes, Route } from "react-router-dom"
import './App.css'
import Menu from './Menu';
import Prestamos from './Prestamos';
import Cuotas from "./Cuotas";
import Clientes from "./Clientes";
import Cobro from "./Cobro";
import AddPrestamo from "./AddPrestamo";
import AddCliente from "./AddCliente";

function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<Menu />}/>
      <Route path="/Prestamos" element={<Prestamos />}/>
      <Route path="/Cuotas" element={<Cuotas />}/>
      <Route path="/Clientes" element={<Clientes />}/>
      <Route path="/Cobro" element={<Cobro />}/>
      <Route path="/NuevoPrestamo" element={<AddPrestamo />}/>
      <Route path="/NuevoCliente" element={<AddCliente />}/>
    </Routes>
     
    </>
  )
}

export default App
