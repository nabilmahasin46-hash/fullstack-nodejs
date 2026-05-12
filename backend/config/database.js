import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.MYSQLHOST,
        port: process.env.MYSQLPORT || 3306,
        dialect: "mysql"
        
    }
);

export default db;