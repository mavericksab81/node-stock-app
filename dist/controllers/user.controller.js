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
const user_model_1 = __importStar(require("../models/user.model"));
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuidv4_1 = require("uuidv4");
const role_model_1 = __importStar(require("../models/role.model"));
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../config");
const sequelize_1 = require("sequelize");
const token_utility_1 = __importDefault(require("../services/token_utility"));
class UserController {
    createModels(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, user_model_1.UserMap)(database_1.default);
                // AssociationMap(database);
                res.status(200).json({ message: "Tables created successfully." });
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let bearerHeader = req.headers['authorization'];
                const [str, token] = bearerHeader.split(' ');
                const checkValidToken = (0, token_utility_1.default)(token);
                if (checkValidToken) {
                    (0, user_model_1.UserMap)(database_1.default);
                    const result = yield user_model_1.default.findAll();
                    res.status(200).json({ users: result });
                }
                else {
                    res.sendStatus(403);
                    // res.status(403).json({
                    //     error: new Error('Token expired. Please login in.')
                    // });
                }
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, user_model_1.UserMap)(database_1.default);
                const checkIfUserExists = yield user_model_1.default.findOne({ where: { email: req.body.email } });
                if (!checkIfUserExists) {
                    // create hash password
                    const salt = yield bcrypt_1.default.genSalt(8);
                    let pwd = req.body.password;
                    pwd = yield bcrypt_1.default.hash(pwd, salt);
                    // create access token
                    const payload = {
                        user: req.body.email,
                        created: new Date().toString(),
                        expiresIn: '1h'
                    };
                    const token = jwt.sign(payload, config_1.token_secret_key);
                    const result = yield user_model_1.default.create({
                        user_id: (0, uuidv4_1.uuid)(),
                        email: req.body.email,
                        username: req.body.username,
                        password: pwd,
                        user_created_date: new Date().toString(),
                        last_login: new Date().toString(),
                        failed_attempts: 0,
                        is_locked: false,
                        access_token: token
                    });
                    res.status(201).json({
                        user: {
                            username: result.username,
                            email: result.email
                        },
                        status: 201,
                        message: 'User created successfully.'
                    });
                }
                else {
                    res.status(200).json({ message: `User with this email ${req.body.email} is already created.` });
                }
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let failed_attempts = 0;
                (0, user_model_1.UserMap)(database_1.default);
                const email_username = req.body.email || req.body.username;
                const checkIfUserExists = yield user_model_1.default.findOne({ where: {
                        [sequelize_1.Op.or]: [{ email: email_username }, { username: email_username }]
                    }
                });
                if (checkIfUserExists) {
                    const pwdCompare = yield bcrypt_1.default.compare(req.body.password, checkIfUserExists['dataValues'].password);
                    if (!pwdCompare) {
                        failed_attempts += 1;
                        user_model_1.default.update({
                            failed_attempts: failed_attempts
                        }, { where: { user_id: checkIfUserExists.user_id } });
                        res.status(200).json({ message: 'Invalid email or password.' });
                    }
                    else {
                        // check if token is expired or not.
                        let token;
                        const validToken = (0, token_utility_1.default)(checkIfUserExists.access_token);
                        if (!validToken) {
                            // create access token
                            const payload = {
                                user: email_username,
                                created: new Date().toString(),
                                expiresIn: '1h'
                            };
                            token = jwt.sign(payload, config_1.token_secret_key);
                            user_model_1.default.update({
                                access_token: token
                            }, { where: { user_id: checkIfUserExists.user_id } });
                        }
                        else {
                            token = checkIfUserExists.access_token;
                        }
                        res.status(200).json({
                            user: {
                                username: checkIfUserExists.username,
                                email: checkIfUserExists.email,
                                token
                            },
                            status: 200,
                            message: 'User signed in successfully.'
                        });
                    }
                }
                else {
                    res.status(200).json({ message: 'Invalid email or password.' });
                }
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
    addRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, role_model_1.RoleMap)(database_1.default);
                const result = yield role_model_1.default.create({
                    role: req.body.role
                });
                res.status(201).json({ message: 'Role added successfully.' });
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map