import { Sequelize } from "sequelize";
import dotenv from "dotenv";

import colors from "colors";

import users from "./data/users.js";
import products from "./data/products.js";

import { User, Product, Order} from "./models/mainModel.js";
import { dbconnection as sequelize } from "./config/db.js";

dotenv.config();



const importData = async () => {
    try{

        await sequelize.sync({force: true});

        await User.destroy({where: {}, truncate: true});
        await Product.destroy({where: {}, truncate: true});
        await Order.destroy({where: {}, truncate: true});

        const createdUsers = await User.bulkCreate(users);
        const adminUser = createdUsers[0].id;

        const sampleProducts = products.map((products) => {
            return {...products, userId: adminUser};
        })

        await Product.bulkCreate(sampleProducts);

        console.log("Data imported successfully").green.inverse;
        process.exit();

    } catch (error) {
        console.log(`${error}`.yellow);
        process.exit(1);
    }
};

const destroyData = async () => {
    try{
        console.log("synchronizing database...".yellow);
        await sequelize.sync({force: true});

        await User.destroy({where: {}, truncate: true});
        await Product.destroy({where: {}, truncate: true});
        await Order.destroy({where: {}, truncate: true});

        console.log("Data destroyed").red.inverse;
    } catch (error) {
        console.log(`${error}`.red);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
}else {
    importData();
}