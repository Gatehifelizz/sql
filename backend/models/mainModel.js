import {dbconnection as sequelize} from "../config/db.js";
import User from "./userModel.js";
import Product from "./productModel.js";
import Order from "./orderModel.js";
import OrderItem from "./orderitemModel.js";
import Review from "./reviewModel.js";

Product.hasMany(Review, {foreignKey: "productId", as: "reviews"});
Review.belongsTo(Product, {foreignKey: "productId" , as: "product"});

Product.hasMany(OrderItem, {foreignKey: "productId", as: "orderItems"});
OrderItem.belongsTo(Product, {foreignKey: "productId", as: "product"});


User.hasMany(Order, {foreignKey: "userId", as: "useOrders"});
Order.belongsTo(User, {foreignKey: "userId", as: "user"});

User.hasMany(Review, {foreignKey: "userId", as: "userReviews"});
Review.belongsTo(User, {foreignKey: "userId", as: "reviewUser"});

Order.hasMany(OrderItem, {foreignKey: "orderId", as: "orderItems"});
OrderItem.belongsTo(Order, {foreignKey: "orderId", as: "order"});

const syncModels = async () => {
    try {
        await sequelize.sync({force: true});
        console.log("All models were synchronized successfully.");
    } catch(error) {
        console.log("error while syncing models", error);
    }
};

syncModels();

export { User, Product, Order, OrderItem, Review };

