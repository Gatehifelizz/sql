import { Sequelize } from "sequelize";
import color from "colors";

const connectdb = async () => {
    try{ 
        const dbconnection  = new Sequelize(process.env.DB_URI, {
            dialect: 'mysql',
            logging: console.log,
        });

        //test connection
        await dbconnection.authenticate();
        console.log(`Database connected: ${dbconnection.config.database}`.cyan.underline);
    } catch (error) {
        console.log (`error: ${error.message}`.bold.red.underline);
        process.exit(1);
    }
};

export default connectdb;