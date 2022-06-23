
import { Sequelize, Model, DataTypes } from "sequelize";

export default class Role extends Model {
    public id: number;
    public role: string;
}

export const RoleMap = (sequelize: Sequelize) => {
    Role.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role: {
            type: DataTypes.STRING(1234),
            unique: true,
            allowNull: false
          },
    }, 
    {
        sequelize,
        tableName: 'role',
        timestamps: false
    });
    Role.sync();
}