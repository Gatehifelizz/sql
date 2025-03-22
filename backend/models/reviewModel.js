import { Sequelize, Model, DataTypes } from "sequelize";

import Product from "./productModel.js";

const sequelize = new Sequelize(
    "mysql://root:sequelizer321@localhost:3306/mystore"
);

const Review = sequelize.define('Review', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references :{
            Model: 'User',
            key: "id",
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            Model: Product,
            key: 'id',
        }
    }
},{
    timeStamps: true,
}
);

console.log(Review === sequelize.models.Review);
export default Review;