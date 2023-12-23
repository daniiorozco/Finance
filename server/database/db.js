import { Sequelize } from "sequelize";
import {config} from 'dotenv';
config();

/**
 * configuracion de la base de datos
 */
 const db = new Sequelize(process.env.MYSQLDB_DATABASE,process.env.MYSQLDB_USER,process.env.MYSQLDB_PASSWORD,{
    host : process.env.MYSQLDB_HOST,
    dialect : 'mysql',
    port : process.env.MYSQLDB_DOCKER_PORT
})

export default db;