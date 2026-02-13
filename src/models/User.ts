import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class User extends Model {
  declare id: number;
  declare nom: string;
  declare prenom: string;
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
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
