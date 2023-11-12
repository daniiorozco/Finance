import Usuario from "../models/usuario.js";

//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getUsuarios = async(req,res)=>{
    try {
      const usuarios = await Usuario.sequelize.query('CALL listUsuarios')
      res.json(usuarios);
    } catch (error) {
        res.json({message: error.message});  
    }
}

//Mostrar un registro
export const getUsuario = async (req,res)=>{
    try {
        const usuario = await Usuario.sequelize.query('EXEC listOneUsuario :id',{
            replacements : {id : req.params.id}
        });
        res.json(usuario[0]);
    } catch (error) {
        res.json({message: error.message}); 
    }
}

//Crear un registro
export const createUsuario = async (req,res)=>{
    try {
        await Usuario.sequelize.query('EXEC spCreateUsuario :mail, :clave',{
            replacements :{mail : req.body.mail ,clave : req.body.clave} 
        });
        res.json({
            "message":"¡Registro creado correctamente!"
        });
    } catch (error) {
        res.json({message: error.message});
    }
}

//Actualizar un registro
export const updateUsuario = async (req,res)=>{
    try {
        await Usuario.sequelize.query('EXEC spUpdateUsuario :id , :mail, :clave',{
            replacements : {id : req.params.id ,mail : req.body.mail , clave : req.body.clave}
        });
        res.json({
            "message":"¡Registro actualizado correctamente!"
        });
    } catch (error) {
        res.json({message: error.message});
    }
}

////Eliminar un registro

export const deleteUsuario = async (req,res)=>{
    try {
        await Usuario.sequelize.query('EXEC spDeleteUsuario :id',{
            replacements : {id : req.params.id}
        });
        res.json({
            "message":"¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} );
    }
}