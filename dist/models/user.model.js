"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMap = exports.Role = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class User extends sequelize_2.Model {
}
exports.default = User;
class Role extends sequelize_2.Model {
}
exports.Role = Role;
const UserMap = (sequelize) => {
    User.init({
        id: {
            type: sequelize_2.DataTypes.STRING(1234),
            primaryKey: true
        },
        email: {
            type: sequelize_2.DataTypes.STRING(1234),
            allowNull: false
        },
        username: {
            type: sequelize_2.DataTypes.STRING(1234)
        },
        password: {
            type: sequelize_2.DataTypes.STRING(1234),
            allowNull: false
        },
        user_created_date: {
            type: sequelize_2.DataTypes.STRING(1234),
            defaultValue: sequelize_1.NOW,
            allowNull: false
        },
        last_login: {
            type: sequelize_2.DataTypes.STRING(1234),
            defaultValue: sequelize_1.NOW,
            allowNull: false
        },
        failed_attempts: {
            type: sequelize_2.DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        is_locked: {
            type: sequelize_2.DataTypes.BOOLEAN,
            defaultValue: false
        },
        access_token: {
            type: sequelize_2.DataTypes.STRING(1234),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'users',
        timestamps: false
    });
    Role.init({
        id: {
            type: sequelize_2.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role: {
            type: sequelize_2.DataTypes.STRING(1234),
            unique: true,
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'role',
        timestamps: false
    });
    User.hasOne(Role, {
        sourceKey: 'id',
        foreignKey: 'user_id',
        as: 'roles' // this determines the name in `associations`!
    });
    // Role.belongsTo(User, { targetKey: 'id' });
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield sequelize.sync();
    }))();
};
exports.UserMap = UserMap;
//# sourceMappingURL=user.model.js.map