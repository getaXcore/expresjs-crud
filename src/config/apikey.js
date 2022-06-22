import { API_KEY,TIMEZONE } from "./config.js";
import moment from 'moment-timezone'
import {logging} from "../utils/res.js";

moment.tz.setDefault(TIMEZONE);

export default function apikey(req,res,next){    

    //check for basic auth header
    if(!req.headers.x_api_key || req.headers.x_api_key != API_KEY){

        logging(moment().format('YYYY-MM-DD HH:mm:ss'),401,'Missing Api Key',req.body,null);

        return res.status(401).json({
            status : '401',
            message: 'Missing Api Key',
            values : null
        });
        
    }

    next();
}