import { Sequelize, Model, DataTypes } from "sequelize";
import User from "./userModel";

const sequelize = new Sequelize(
  "mysql://root:sequelizer321@localhost:3306/mystore"
);

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        Model: User,
        key: "id",
      },
    },
   

   
    shippingAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    city:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,   
    },

    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    paymentResultId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    paymentResultStatus: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    paymentResultUpdateTime: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    paymentResultEmail: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    taxprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    shippingPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    totalprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    paidAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isDelivered: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    deliveredAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

console.log(Order === sequelize.models.Order);
export default Order;

(async () => {
    await sequelize.sync({ force: true });
    console.log("model  synchronized successfully.");
})
