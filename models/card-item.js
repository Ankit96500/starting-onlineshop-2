import {Sequelize} from "sequelize";
import sequelize from "../util/database.js";

const CartItem = sequelize.define('cartitem',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:true,
        primaryKey:true
    },
    Quantity:{
        type:Sequelize.INTEGER
    }

});

export default CartItem;
