"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const database_1 = __importDefault(require("./database"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.start = (port) => {
            return new Promise((resolve, reject) => {
                this.app.listen(port, () => {
                    resolve(port);
                }).on('error', (err) => reject(err));
            });
        };
        this.app = (0, express_1.default)();
        this.config();
        this.dbConnect();
        this.routeConfig();
    }
    config() {
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json({ limit: '5mb' }));
        this.app.use((0, cors_1.default)({
            origin: '*'
        }));
    }
    dbConnect() {
        database_1.default.authenticate();
        console.log('connected to the db..');
    }
    routeConfig() {
        this.app.use('/api', user_routes_1.default);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map