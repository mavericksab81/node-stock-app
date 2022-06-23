"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const jwt = __importStar(require("jsonwebtoken"));
const addHours = (numOfHours, token_created_date) => {
    const hours = numOfHours.match(/\d+/)[0];
    const newDate = new Date(token_created_date).getTime() + (hours * 60 * 60 * 1000);
    return newDate;
};
const validateToken = (token) => {
    const token_decode = jwt.verify(token, config_1.token_secret_key);
    const updatedDate = addHours(token_decode['expiresIn'], token_decode['created']);
    const currentDate = Math.ceil(new Date().getTime() / 1000);
    const tokenCreatedDate = updatedDate / 1000;
    return tokenCreatedDate > currentDate ? true : false;
};
exports.default = validateToken;
//# sourceMappingURL=token_utility.js.map