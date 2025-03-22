import { Sequelize } from "sequelize";
import color from "colors";
import dotenv from "dotenv";


dotenv.config();

const dbconnection = new Sequelize(
    process.env.DB_URI,
    {
        host:"localhost",
        dialect: 'mysql',
        logging: console.log,
    }
);

const connectdb = async () => {
    try{ 
        //test connection
        await dbconnection.authenticate();
        console.log(`Database connected: ${dbconnection.config.database}`.cyan.underline);
    } catch (error) {
        console.log (`error: ${error.message}`.bold.red.underline);
        process.exit(1);
    }
};

export { dbconnection};
export default connectdb;