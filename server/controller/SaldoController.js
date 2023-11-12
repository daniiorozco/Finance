import Saldo from '../models/saldo.js';

//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getSaldos = async(req,res)=>{
    try {
      const saldos = await Saldo.sequelize.query('CALL sps_saldo_prestamo')
      res.json(saldos);
    } catch (error) {
        res.json({message: error.message});  
    }
}

//Mostrar un registro
export const getSaldo = async (req,res)=>{
    try {
        const saldo = await Saldo.sequelize.query('CALL sps_un_saldo (:id_prestamo)',{
            replacements : {id_prestamo : req.params.id_prestamo}
        });
        res.json(saldo[0]);
    } catch (error) {
        res.json({message: error.message}); 
    }
}

//Actualizar un registro
export const updateSaldo = async (req,res)=>{
    try {
        await Saldo.sequelize.query('CALL spu_saldo_prestamo (:id_prestamo , :saldo)',{
            replacements : {id_prestamo : req.params.id_prestamo ,
                            saldo : req.body.saldo }
        });
        res.json({
            "message":"¡Registro actualizado correctamente!"
        });
    } catch (error) {
        res.json({message: error.message});
    }
}