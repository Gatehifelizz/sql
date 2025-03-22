import { Sequelize,  DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

const sequelize = new Sequelize('mysql://root:sequelizer321@localhost:3306/mystore')

const User = sequelize.define('User', {
    id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
 

},
    {
        timestamps: true,
       
        hooks:{
            beforeCreate: async (User) => {
                User.password = await bcrypt.hash(User.password, 10);
            }
        }

});
 //matching passwords first.
User.prototype.matchpassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
},


console.log(User === sequelize.models.User); // true
export default User;