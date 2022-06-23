import bodyParser from "body-parser";
import express from "express";
import userRouter from "./routes/user.routes";
import database from './database';
import cors from "cors";


class Server {
    private app;

    constructor() {
        this.app = express();
        this.config();
        this.dbConnect();
        this.routeConfig();
    }

    private config() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ limit: '5mb' }));
        this.app.use(cors({
            origin: '*'
        }));
    }

    private dbConnect() {
        database.authenticate();
        console.log('connected to the db..')
    }

    private routeConfig() {
        this.app.use('/api', userRouter);
    }

    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve(port)
            }).on('error', (err: Object) => reject(err));
        })
    }
}

export default Server;