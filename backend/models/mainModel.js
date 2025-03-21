import sequelize from "../config/db.js";
import User from "./userModel";
import Product from "./productModel";
import Order from "./orderModel";
import OrderItem from "./orderItemModel";
import Review from "./reviewModel";

Product.hasMany(Review, {foreignKey: "productId", as: "reviews"});
Review.belongsTo(Product, {foreignKey: "productId" , as: "product"});

Product.hasMany(OrderItem, {foreignKey: "userId", as: "orderItems"});
OrderItem.belongsTo(Product, {foreignKey: "productId", as: "product"});


User.hasMany(Order, {foreignKey: "userId", as: "reviews"});
Order.belongsTo(User, {foreignKey: "userId", as: "user"});

User.hasMany(Review, {foreignKey: "userId", as: "reviews"});
Review.belongsTo(User, {foreignKey: "userId", as: "user"});

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

