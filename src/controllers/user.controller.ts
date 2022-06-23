import User, { UserMap } from '../models/user.model';
import database from '../database';
import bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';
import Role, { RoleMap } from '../models/role.model';
import * as jwt from 'jsonwebtoken';
import { token_secret_key } from '../config';
import { Op } from 'sequelize';
import validateToken from '../services/token_utility';
import { AssociationMap } from '../models/associations.model';

class UserController {

    public async createModels(req, res) {
        try {
            UserMap(database);
            // AssociationMap(database);
            res.status(200).json({ message: "Tables created successfully." })
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async getAll(req, res) {
        try {
            let bearerHeader = req.headers['authorization'];
            const [str, token] = bearerHeader.split(' ');
            const checkValidToken = validateToken(token);
            if (checkValidToken) {
                UserMap(database);
                const result = await User.findAll();
                res.status(200).json({ users: result });
            } else {
                res.sendStatus(403);
                // res.status(403).json({
                //     error: new Error('Token expired. Please login in.')
                // });
            }
            
        } catch (error) {
            res.status(400).send(error);
        }
    }

    

    public async create(req, res) {
        try {
            UserMap(database);
            const checkIfUserExists = await User.findOne({ where: { email: req.body.email } });
            if (!checkIfUserExists) {
                // create hash password
                const salt = await bcrypt.genSalt(8);
                let pwd = req.body.password;
                pwd = await bcrypt.hash(pwd, salt);
                
                // create access token
                const payload = {
                    user: req.body.email,
                    created: new Date().toString(),
                    expiresIn: '1h'
                }

                const token = jwt.sign(payload, token_secret_key);
                
                const result = await User.create({
                    user_id: uuid(),
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
                    user: 
                        {
                            username: result.username,
                            email: result.email
                        }, 
                        status: 201,
                        message: 'User created successfully.' 
                });
            } else {
                res.status(200).json({ message: `User with this email ${req.body.email} is already created.` });
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async login(req, res) {
        try {
            let failed_attempts = 0;
            UserMap(database);
            const email_username = req.body.email || req.body.username;
            const checkIfUserExists = await User.findOne({
                where: {
                    [Op.or]: [ { email: email_username }, { username: email_username } ]
                } 
            });
            if (checkIfUserExists) {
                const pwdCompare = await bcrypt.compare(req.body.password, checkIfUserExists['dataValues'].password);
                if (!pwdCompare) {
                    failed_attempts += 1;
                    User.update({
                        failed_attempts: failed_attempts
                    },{ where: { user_id: checkIfUserExists.user_id } })
                    res.status(200).json({ message: 'Invalid email or password.' });
                } else {
                    // check if token is expired or not.
                    let token;
                    const validToken = validateToken(checkIfUserExists.access_token);
                    if (!validToken) {
                        // create access token
                        const payload = {
                            user: email_username,
                            created: new Date().toString(),
                            expiresIn: '1h'
                        }
                        token = jwt.sign(payload, token_secret_key);
                        User.update({
                            access_token: token
                        }, { where: { user_id: checkIfUserExists.user_id }})
                    } else {
                        token = checkIfUserExists.access_token;
                    }
                    res.status(200).json({ 
                        user: 
                        {
                            username: checkIfUserExists.username,
                            email: checkIfUserExists.email,
                            token
                        }, 
                        status: 200,
                        message: 'User signed in successfully.' });
                }
            } else {
                res.status(200).json({ message: 'Invalid email or password.' });
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async addRole(req, res) {
        try {
            RoleMap(database);
            const result = await Role.create({
                role: req.body.role
            });
            res.status(201).json({ message: 'Role added successfully.' })
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default UserController;