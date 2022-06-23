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
exports.AssociationMap = exports.Address = exports.Project = exports.Person = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class Person extends sequelize_2.Model {
}
exports.Person = Person;
class Project extends sequelize_2.Model {
}
exports.Project = Project;
class Address extends sequelize_2.Model {
}
exports.Address = Address;
const AssociationMap = (sequelize) => {
    Person.init({
        id: {
            type: sequelize_2.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: sequelize_2.DataTypes.STRING(1234),
            allowNull: false
        },
        createdAt: {
            type: sequelize_2.DataTypes.STRING(1234),
            defaultValue: sequelize_1.NOW,
            allowNull: false
        },
        updatedAt: {
            type: sequelize_2.DataTypes.STRING(1234),
            defaultValue: sequelize_1.NOW,
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'persons',
        timestamps: false
    });
    Project.init({
        id: {
            type: sequelize_2.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new sequelize_2.DataTypes.STRING(128),
            allowNull: false
        },
        createdAt: {
            type: sequelize_2.DataTypes.STRING(1234),
            defaultValue: sequelize_1.NOW,
            allowNull: false
        },
        updatedAt: {
            type: sequelize_2.DataTypes.STRING(1234),
            defaultValue: sequelize_1.NOW,
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'projects'
    });
    Address.init({
        id: {
            type: sequelize_2.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        address: {
            type: new sequelize_2.DataTypes.STRING(128),
            allowNull: false
        },
        createdAt: {
            type: sequelize_2.DataTypes.STRING(1234),
            defaultValue: sequelize_1.NOW,
            allowNull: false
        },
        updatedAt: {
            type: sequelize_2.DataTypes.STRING(1234),
            defaultValue: sequelize_1.NOW,
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'address'
    });
    Person.hasMany(Project, {
        sourceKey: 'id',
        foreignKey: 'ownerId',
        as: 'projects' // this determines the name in `associations`!
    });
    Address.belongsTo(Person, { targetKey: 'id' });
    Person.hasOne(Address, { sourceKey: 'id' });
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield sequelize.sync();
    }))();
};
exports.AssociationMap = AssociationMap;
//# sourceMappingURL=associations.model.js.map