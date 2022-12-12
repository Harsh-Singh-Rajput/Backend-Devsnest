import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class User extends Model {} ;

User.init(
    {
        name:{
            type: DataTypes.STRING
        },
        email:{
            type: DataTypes.STRING
        },
        password:{
            type: DataTypes.STRING
        },
    },
    {
        sequelize, modelName:"user"
    }
)

export default User