import { token_secret_key } from "../config";
import * as jwt from 'jsonwebtoken';

const addHours = (numOfHours: any, token_created_date) => {
    const hours = numOfHours.match(/\d+/)[0];
    const newDate = new Date(token_created_date).getTime() + (hours * 60 * 60 * 1000);
    return newDate;
}

const validateToken = (token: any) => {
    const token_decode = jwt.verify(token, token_secret_key);
    const updatedDate = addHours(token_decode['expiresIn'], token_decode['created']);
    const currentDate = Math.ceil(new Date().getTime() / 1000);
    const tokenCreatedDate = updatedDate / 1000;
    return tokenCreatedDate > currentDate ? true : false;
}

export default validateToken;