import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const Prestamo = db.define('prestamo',{
    id_cliente : {type : DataTypes.INTEGER},
    cantidad_prestada : {type : DataTypes.DOUBLE},
    fecha_baja : {type : DataTypes.DATE} 

});

export default Prestamo;