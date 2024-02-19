import Prestamo from '../models/prestamo.js';
import { validarCamposPrestamo } from '../validaciones/validacion.js';

//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getPrestamos = async (req, res) => {
    try {
        const prestamos = await Prestamo.sequelize.query('CALL sps_prestamo');
        res.json(prestamos);
    } catch (error) {
        res.json({ message: error.message });
    }
}

//Mostrar un registro
export const getPrestamo = async (req, res) => {
    try {
        const prestamo = await Prestamo.sequelize.query('CALL sps_un_prestamo (:id)', {
            replacements: { id: req.params.id }
        });
        res.json(prestamo[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

//Crear un registro
export const createPrestamo = async (req, res) => {
    try {
        // Validar los campos antes de continuar
        validarCamposPrestamo(req.body);

        await Prestamo.sequelize.query('CALL spi_prestamo (:id_cliente , :cantidad_prestada, :total_deuda, :interes)', {
            replacements: {
                id_cliente:        req.body.id_cliente,
                cantidad_prestada: req.body.cantidad_prestada,
                total_deuda:       req.body.total_deuda,
                interes :          req.body.interes}
        });
        res.json({
            "message": "¡Registro creado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

//Actualizar un registro
export const updatePrestamo = async (req, res) => {
    try {
        await Prestamo.sequelize.query('CALL spu_prestamo (:id , :cantidad_prestada )', {
            replacements: { id: req.params.id, cantidad_prestada: req.body.cantidad_prestada }
        });
        res.json({
            "message": "¡Registro actualizado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

////Eliminar un registro
export const deletePrestamo = async (req, res) => {
    try {
        await Prestamo.sequelize.query('CALL spd_prestamo (:id)', {
            replacements: { id: req.params.id }
        });
        res.json({
            "message": "¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json({ message: error.message });
    }
}