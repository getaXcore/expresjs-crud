import moment from "moment-timezone";
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const User = db.define('person', {
    first_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    created_date: {
        type: DataTypes.STRING
        /*type: DataTypes.DATE,
        get: function(){
            return moment(this.getDataValue).format('YYYY-MM-DD HH:mm:ss')
        }*/
    },
    modified_date: {
        type: DataTypes.STRING
        /*type: DataTypes.DATE,
        get: function(){
            return moment(this.getDataValue).format('YYYY-MM-DD HH:mm:ss')
        }*/
    }
}, {
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
});

export default User;
