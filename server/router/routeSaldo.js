import express from 'express';
import {getSaldos,getSaldo,updateSaldo} from '../controller/SaldoController.js';
const router = express.Router();

router.get('/',getSaldos);
router.get('/:id_prestamo',getSaldo);
router.put('/:id_prestamo',updateSaldo);

export default router;
