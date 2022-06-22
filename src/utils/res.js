import { logger } from "../config/winston.js";

export default function Response(values, message, res, code) {
    if(code == 404 ) res.status(404).send({
        'status': 404,
        'message': message,
        'values': values
    });

    else if(code == 500) 
        res.status(500); 
    
    else res.send({
        'status': 200,
        'message': message,
        'values': values
    });

    res.end();
}
export function logging(timestamp,statuscode,error,req,res,url){
    var data = {
        'timestamp': timestamp,
        'status': statuscode,
        'request': req,
        'response': res,
        'error': error,
        'url': url,
    };
    if(error !== null) logger.error(data)
    else logger.info(data);
}