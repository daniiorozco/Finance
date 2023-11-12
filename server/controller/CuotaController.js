import Cuota from '../models/cuota.js';

//** Métodos para el CRUD **/

//Mostrar un registro
export const getCuota = async (req,res)=>{
    try {
        const cuota = await Cuota.sequelize.query('CALL sps_cuota_pagada (:id_prestamo)',{
            replacements : {id_prestamo : req.params.id_prestamo}
        });
        res.json(cuota);
    } catch (error) {
        res.json({message: error.message}); 
    }
}

//Crear un registro
export const createCuota = async (req,res)=>{
    try {
        await Cuota.sequelize.query('CALL spi_cuota_pagada (:id_prestamo , :cuota)',{
            replacements :{id_prestamo : req.body.id_prestamo ,cuota : req.body.cuota} 
        });
        res.json({
            "message":"¡Registro creado correctamente!"
        });
    } catch (error) {
        res.json({message: error.message});
    }
}

//Actualizar un registro
export const updateCuota = async (req,res)=>{
    try {
        await Cuota.sequelize.query('CALL spu_cuota_pagada (:id , :cuota )',{
            replacements : {id : req.params.id ,
                            cuota  : req.body.cuota }
        });
        res.json({
            "message":"¡Registro actualizado correctamente!"
        });
    } catch (error) {
        res.json({message: error.message});
    }
}