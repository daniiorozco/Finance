import db from '../database/db.js';
import { DataTypes } from "sequelize";

const Usuario = db.define('usuario',{
    mail : {type : DataTypes.STRING},
    clave : {type : DataTypes.STRING}
});

export default Usuario;