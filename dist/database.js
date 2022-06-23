"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = new sequelize_1.Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    database: "test_db",
    username: "hello_flask",
    password: "hello_flask"
});
//# sourceMappingURL=database.js.map