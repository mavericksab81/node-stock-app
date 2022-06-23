import express, { Router } from 'express';
import UserController from '../controllers/user.controller';

const UserRouter = Router();
const userController = new UserController();

UserRouter.post('/login', userController.login);
UserRouter.get('/users', userController.getAll);
UserRouter.post('/signup', userController.create);
UserRouter.post('/models', userController.createModels);
UserRouter.post('/role', userController.addRole);

export default UserRouter;