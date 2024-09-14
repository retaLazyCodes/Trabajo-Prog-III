import dotenv from 'dotenv';
dotenv.config();

const {
    DEV_PORT,
    NODEMAILER_EMAIL,
    NODEMAILER_PASSWORD
} = process.env;

const config = {
    NODEMAILER_EMAIL,
    NODEMAILER_PASSWORD,
    PORT: process.env.PORT ? process.env.PORT : DEV_PORT
};

export { config };
