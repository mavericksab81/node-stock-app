"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.Roles = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
exports.Roles = database_1.default.define('Role', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(1234),
        unique: true
    }
}, {
    timestamps: false,
    modelName: 'roles'
});
exports.Roles.sync();
exports.Users = database_1.default.define('User', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING(1234),
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING(1234)
    },
    role_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: exports.Roles,
            key: 'id'
        }
    }
}, {
    timestamps: false,
    modelName: 'users'
});
exports.Users.sync();
// Users.hasOne(Roles, {
//     foreignKey: 'fk_user_role_id'
// });
// Roles.belongsTo(Users);
// (async () => {
//     await database.sync({ force: true });
//   })();
//# sourceMappingURL=users.model.js.map