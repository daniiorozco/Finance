import express from 'express';
import cors from 'cors';

import db from './database/db.js';
import routerUsuario from './router/routeUsuario.js';
import routerCliente from './router/routeCliente.js';
import routerPrestamo from './router/routerPrestamo.js';
import routerCuota from './router/routeCuota.js';
import routerSaldo from './router/routeSaldo.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios',routerUsuario);
app.use('/clientes',routerCliente);
app.use('/prestamos',routerPrestamo);
app.use('/cuotas',routerCuota);
app.use('/saldo',routerSaldo);

try {
    await db.authenticate()
    console.log('Conexión exitosa a la DB')
} catch (error) {
    console.log(`El error de conexión es: ${error}`)
}

app.listen(8000, ()=>{
    console.log('Server UP running in http://localhost:8000/')
})