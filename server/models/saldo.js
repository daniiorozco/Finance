import db from '../database/db.js';
import { DataTypes } from "sequelize";

const Saldo = db.define('saldo_prestamo',{
    id_prestamo : {type : DataTypes.INTEGER},
    saldo       : {type : DataTypes.DOUBLE}
});

export default Saldo;