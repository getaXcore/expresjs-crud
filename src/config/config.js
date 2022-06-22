import dotenv from 'dotenv'

dotenv.config()
export const {
    DB_HOST, 
    DB_PORT, 
    DB_NAME, 
    DB_USER, 
    DB_PASS, 
    API_KEY,
    TIMEZONE,
} = process.env