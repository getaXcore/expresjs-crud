// import sequelize
import { Sequelize } from "sequelize";
import {DB_HOST,DB_NAME,DB_USER,DB_PASS,TIMEZONE} from './config.js'
import { queryLogging } from "../utils/res.js";
import moment from "moment-timezone";

// create connection
const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    pool:{
        max:5, //Maximum number of connection in pool
        min:0, //Minimum number of connection in pool
        idle:1000, //The maximum time, in milliseconds, that a connection can be idle before being released
        acquire:1000, //The maximum time, in milliseconds, that pool will try to get connection before throwing error
    },
    logging:(msg) => queryLogging(moment().format('YYYY-MM-DD HH:mm:ss'),msg),
});

// export connection
export default db;