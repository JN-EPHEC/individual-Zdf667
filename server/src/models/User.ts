import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class User extends Model {
  declare id: number;
  declare nom: string;
  declare prenom: string;
  declare age: number;
}

User.init(
  {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue :18
    }
  },
  {
    sequelize,
    modelName: "User", tableName: "users"
  }
);

export default User;
