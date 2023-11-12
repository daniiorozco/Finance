import db from '../database/db.js';
import {  DataTypes } from 'sequelize';

const Cliente = db.define('cliente',{
    nombre : {type : DataTypes.STRING},
    apellido : {type : DataTypes.STRING},
    dni : {type : DataTypes.STRING},
    direccion : {type: DataTypes.STRING},
    fecha_baja : {type : DataTypes.DATE}
});

export default Cliente;