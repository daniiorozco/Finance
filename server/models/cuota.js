import db from '../database/db.js';
import { DataTypes } from "sequelize";

const Cuota = db.define('cuotas_pagadas',{
    id_prestamo : {type : DataTypes.INTEGER},
    cuota : {type : DataTypes.DOUBLE}
});

export default Cuota;