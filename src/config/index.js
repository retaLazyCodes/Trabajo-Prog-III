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
    server: {
        PORT: process.env.PORT ? process.env.PORT : DEV_PORT,
        routes: {
            users: '/api/users',
            claims: '/api/claims',
            auth: '/api/auth',
            email: '/api/email',
            offices: '/api/offices'
        }
    }
};

export { config };
