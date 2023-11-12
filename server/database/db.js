import { Sequelize } from "sequelize";

/**
 * configuracion de la base de datos
 */
 const db = new Sequelize('prestamosnpjd','root','',{
    host : 'localhost',
    dialect : 'mysql',
    port : 3306
})

export default db;