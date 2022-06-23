import { db_host, db_port, db_name, db_user, db_password, db_dialect } from './config';
import { Sequelize } from 'sequelize';

export default new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database: "test_db",
  username: "hello_flask",
  password: "hello_flask"
});