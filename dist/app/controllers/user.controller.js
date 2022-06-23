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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../config/db.config"));
class UserController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield db_config_1.default.connect();
                const sql = "SELECT * FROM users";
                const { rows } = yield client.query(sql);
                console.log(rows);
                client.release();
                res.send(rows);
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map