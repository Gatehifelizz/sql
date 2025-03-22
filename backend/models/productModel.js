import { Sequelize, Model, DataTypes }  from "sequelize";
import User from "./userModel.js";

const sequelize = new Sequelize('mysql://root:sequelizer321@localhost:3306/mystore')

const Product = sequelize.define('Product', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            Model: User,
            key: 'id',
        }
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    Image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type :DataTypes.STRING,
        allowNull: false,
    },
    brand:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    description :{
        type: DataTypes.STRING,
        allowNull: false,
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    countInStock: {
        type: DataTypes.INTEGER,
        alllwoNull: false,
        defaultValue: 0,
    },
    numReviews: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }},
{
    timeStamps: true,
});

console.log(Product === sequelize.models.Product)
export default Product;

