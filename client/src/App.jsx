import { Routes, Route } from "react-router-dom"
import './App.css'
import Menu from './pages/Menu';
import Prestamos from './pages/Prestamos';
import Cuotas from "./pages/Cuotas";
import Clientes from "./pages/Clientes";
import Cobro from "./pages/Cobro";
import AddPrestamo from "./components/AddLoan";
import AddCliente from "./components/AddCustomer";

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
