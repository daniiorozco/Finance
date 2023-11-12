import Cliente from '../models/cliente.js';

//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getClientes = async(req,res)=>{
    try {
        const clientes = await Cliente.sequelize.query('CALL sps_cliente');
        res.json(clientes);
    } catch (error) {
        res.json({message: error.message});
    }
}

//Mostrar un registro
export const getCliente = async(req,res)=>{
    try {
        const cliente = await Cliente.sequelize.query('CALL sps_un_cliente (:id)',{
            replacements : {id : req.params.id}
        });
        res.json(cliente[0]);
    } catch (error) {
        res.json({message: error.message});
    }
}

//Crear un registro
export const createCliente = async (req,res) =>{
    try {
    await Cliente.sequelize.query('CALL spi_cliente (:nombre , :apellido , :dni , :direccion)',{
        replacements : {nombre : req.body.nombre, 
                        apellido : req.body.apellido,
                        dni: req.body.dni,
                        direccion : req.body.direccion}
    });
    res.json({
        "message":"¡Registro creado correctamente!"
    })
    } catch (error) {
        res.json({message: error.message});
    }
}

//Actualizar un registro
export const updateCliente = async (req,res)=>{
        try {
            await Cliente.sequelize.query('CALL spu_cliente (:id , :nombre , :apellido , :dni , :direccion)',{
                replacements : {id : req.params.id,
                                nombre : req.body.nombre,
                                apellido : req.body.apellido,
                                dni : req.body.dni,
                                direccion : req.body.direccion
                        }
            });
            res.json({
                "message":"¡Registro actualizado correctamente!"
            });
        } catch (error) {
            res.json({message: error.message});
        }
}

////Eliminar un registro

export const deleteCliente = async (req,res)=>{
    try {
        await Cliente.sequelize.query('CALL spd_cliente (:id)',{
            replacements : {id : req.params.id}
        });
        res.json({
            "message":"¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} );
    }
}