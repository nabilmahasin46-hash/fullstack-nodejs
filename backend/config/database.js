import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MYSQLDATABASE || !process.env.MYSQLUSER || !process.env.MYSQLPASSWORD || !process.env.MYSQLHOST) {
    console.warn('⚠️  Warning: Missing required database environment variables');
}

const db = new Sequelize(
    process.env.MYSQLDATABASE || 'database',
    process.env.MYSQLUSER || 'user',
    process.env.MYSQLPASSWORD || 'password',
    {
        host: process.env.MYSQLHOST || 'localhost',
        port: process.env.MYSQLPORT || 3306,
        dialect: "mysql",
        dialectOptions: {
            ssl: {
                require: true,

                rejectUnauthorized: false 
            }
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: process.env.DB_LOG === 'true' ? console.log : false 
    }
);
// Test connection
db.authenticate()
    .then(() => {
        console.log('✅ Database Connected Successfully!');
        console.log(`   Host: ${process.env.MYSQLHOST}:${process.env.MYSQLPORT}`);
        console.log(`   Database: ${process.env.MYSQLDATABASE}`);
    })
    .catch((err) => {
        console.error('❌ Database Connection Failed:', err.message);
        console.error('   Check your .env file has correct credentials');
    });

export default db;