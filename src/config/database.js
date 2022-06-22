// import sequelize
import { Sequelize } from "sequelize";
import {DB_HOST,DB_NAME,DB_USER,DB_PASS} from './config.js'

// create connection
const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql'
});

// export connection
export default db;