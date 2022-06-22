import User from "../models/user.js";
import Response, { logging } from "../utils/res.js";
import moment from 'moment-timezone';
import sequelize from "sequelize";
import {TIMEZONE} from '../config/config.js'

moment.tz.setDefault(TIMEZONE);

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes:[
                'id',
                'first_name',
                'last_name',
                [sequelize.fn('DATE_FORMAT',sequelize.col('created_date'),'%Y-%m-%d %H:%i:%s'),'created_date'],
                [sequelize.fn('DATE_FORMAT',sequelize.col('modified_date'),'%Y-%m-%d %H:%i:%s'),'modified_date']
            ]
        });
        Response(users, 'Success', res, 200);
        logging(moment().format('YYYY-MM-DD HH:mm:ss'),200,null,null,users,req.url);
    } catch (e) {
        Response(null, e.message, res, 500);
        logging(moment().format('YYYY-MM-DD HH:mm:ss'),500,e.message,null,null,req.url);
        
    }
}

export const getUser = async (req, res) => {
    try {
        const data = req.body;

        if(!data || !data.id){
            Response(null, 'Oopss... invalid body request', res, 404);
            logging(moment().format('YYYY-MM-DD HH:mm:ss'),404,'Oopss... invalid body request',data,null,req.url);
        }else{         
            const user = await User.findOne({
                attributes:[
                    'id',
                    'first_name',
                    'last_name',
                    [sequelize.fn('DATE_FORMAT',sequelize.col('created_date'),'%Y-%m-%d %H:%i:%s'),'created_date'],
                    [sequelize.fn('DATE_FORMAT',sequelize.col('modified_date'),'%Y-%m-%d %H:%i:%s'),'modified_date']
                ],
                where: { id: data.id }
            });

            if (user === null) {
                Response(user, 'User not found', res, 404);
                logging(moment().format('YYYY-MM-DD HH:mm:ss'),404,'User not found',data,null,req.url);
                return;
            }

            Response(user, 'Success', res, 200);
            logging(moment().format('YYYY-MM-DD HH:mm:ss'),200,null,data,user,req.url);
        }
    } catch (e) {
        Response(null, e.message, res, 500);
        logging(moment().format('YYYY-MM-DD HH:mm:ss'),500,e.message,null,null,req.url);
    }
}

export const saveUser = async (req, res) => {
    try {

        if(!req.body || !req.body.first_name || !req.body.last_name){
            Response(null, 'Oopss... invalid body request', res, 404);
            logging(moment().format('YYYY-MM-DD HH:mm:ss'),404,'Oopss... invalid body request',req.body,null,req.url);
        }else{
           const data = Object.assign(
                req.body,
                {
                    created_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                    modified_date: moment().format('YYYY-MM-DD HH:mm:ss')
                }
            )
    
            await User.create(data);
            Response(null, 'Saving...', res, 200);
            logging(moment().format('YYYY-MM-DD HH:mm:ss'),200,null,data,'Saving success',req.url);
        }
        
    } catch (e) {
        Response(null, e.message, res, 500);
        logging(moment().format('YYYY-MM-DD HH:mm:ss'),500,e.message,null,null,req.url);
    }
}

export const updateUser = async (req, res) => {
    try {
        if(!req.body || !req.body.first_name || !req.body.last_name || !req.body.id){
            Response(null, 'Oopss... invalid body request', res, 404);
            logging(moment().format('YYYY-MM-DD HH:mm:ss'),404,'Oopss... invalid body request',req.body,null,req.url);
        }else{
            const firstName = req.body.first_name;
            const lastName = req.body.last_name;
            const idUser = req.body.id;
            const value = {first_name:firstName,last_name:lastName};
            const data = Object.assign(
                value,
                {
                    modified_date: moment().format('YYYY-MM-DD HH:mm:ss')
                }
            )

            const user = await User.findOne({
                where: { id: idUser }
            });

            if (user === null) {
                Response(user, 'User not found', res, 404);
                logging(moment().format('YYYY-MM-DD HH:mm:ss'),404,'User not found',req.body,null,req.url);
                return;
            };

            await User.update(data, {
                where: { id: idUser }
            });

            Response(null, 'Updated...', res);
            logging(moment().format('YYYY-MM-DD HH:mm:ss'),200,null,req.body,'Updated success',req.url);
        }

    } catch (e) {
        Response(null, e.message, res, 500);
        logging(moment().format('YYYY-MM-DD HH:mm:ss'),500,e.message,null,null,req.url);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const data = req.body;

        if(!data || !data.id){
            Response(null, 'Oopss... invalid body request', res, 404);
            logging(moment().format('YYYY-MM-DD HH:mm:ss'),404,'Oopss... invalid body request',data,null,req.url);
        }else{

            const user = await User.findOne({
                where: { id: data.id }
            });

            if (user === null) {
                Response(user, 'User not found', res, 404);
                logging(moment().format('YYYY-MM-DD HH:mm:ss'),404,'User not found',data,user,req.url);
                return;
            };

            await User.destroy({
                where: { id: data.id }
            });

            Response(null, 'Deleted...', res, 200);
            logging(moment().format('YYYY-MM-DD HH:mm:ss'),200,null,data,'Deleted success',req.url);
        }

    } catch (e) {
        Response(null, e.message, res, 500);
        logging(moment().format('YYYY-MM-DD HH:mm:ss'),500,e.message,null,null,req.url);
    }
}