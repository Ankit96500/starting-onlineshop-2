import { Sequelize } from "sequelize";
import sequelize from "../util/database.js";
import { name } from "ejs";

const User  = sequelize.define('user',{
    id:{type:Sequelize.INTEGER,autoIncrement:true,allowNull:false,primaryKey:true},
    name:{type:Sequelize.STRING},
    email:{ype: Sequelize.STRING}
});

export {User}