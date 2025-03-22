import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize(
    "mysql://root:sequelizer321@localhost:3306/mystore"
);

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    qty:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            Model: 'Product',
            key: 'id',
        }
    },
    orderId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            Model: 'Order',
            key: 'id',
        }
    },
},
{
    timestamps: true,
})

console.log(OrderItem === sequelize.models.OrderItem);
export default OrderItem;