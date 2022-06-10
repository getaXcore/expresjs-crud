// import sequelize
import { Sequelize } from "sequelize";

// create connection
const db = new Sequelize('db_express', 'root', '', {
    host: '10.2.205.73',
    dialect: 'mysql'
});

// export connection
export default db;