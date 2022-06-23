import * as dotenv from 'dotenv';

dotenv.config({
  path: '${__dirname}/../.env'
});

export const port = Number(process.env.PORT);
export const db_host = String(process.env.DB_HOST);
export const db_port = Number(process.env.DB_PORT);
export const db_name = String(process.env.DB_NAME);
export const db_user = String(process.env.DB_USER);
export const db_password = String(process.env.DB_PASSWORD);
export const db_dialect = String(process.env.DB_DIALECT);
export const token_secret_key = String(process.env.TOKEN_SECRET_KEY)
