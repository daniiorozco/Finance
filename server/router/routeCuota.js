import express from 'express';
import {getCuota,createCuota,updateCuota} from '../controller/CuotaController.js';

const router = express.Router();

router.get('/:id_prestamo',getCuota);
router.post('/',createCuota);
router.put('/:id',updateCuota);

export default router;