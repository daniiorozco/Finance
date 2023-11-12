import express from 'express';
import { getPrestamos,getPrestamo,createPrestamo,updatePrestamo,deletePrestamo } from '../controller/PrestamoController.js';

const router = express.Router();

router.get('/',getPrestamos);
router.get('/:id',getPrestamo);
router.post('/',createPrestamo);
router.put('/:id',updatePrestamo);
router.delete('/:id',deletePrestamo);

export default router;