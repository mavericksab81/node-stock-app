"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleMap = void 0;
const sequelize_1 = require("sequelize");
class Role extends sequelize_1.Model {
}
exports.default = Role;
const RoleMap = (sequelize) => {
    Role.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role: {
            type: sequelize_1.DataTypes.STRING(1234),
            unique: true,
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'role',
        timestamps: false
    });
    Role.sync();
};
exports.RoleMap = RoleMap;
//# sourceMappingURL=role.model.js.map