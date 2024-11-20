import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'nodemailer-express-handlebars';

const {
    NODEMAILER_EMAIL,
    NODEMAILER_PASSWORD
} = process.env;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASSWORD
    }
});

transporter.use('compile', hbs({
    viewEngine: {
        extname: '.hbs',
        layoutsDir: '',
        defaultLayout: false,
        partialsDir: path.join(__dirname, '../templates')
    },
    viewPath: path.join(__dirname, '../templates'),
    extName: '.hbs'
}));

const prepareEmailOptions = ({ to, subject, userName, idClaim, statusClaim, dateUpdate }) => {
    if (!to || !subject || !userName || !idClaim || !statusClaim || !dateUpdate) {
        throw new Error('Faltan datos para enviar el correo');
    }

    return {
        from: NODEMAILER_EMAIL,
        to,
        subject,
        template: 'claimStatusNotification',
        context: {
            userName,
            idClaim,
            statusClaim,
            dateUpdate
        }
    };
};

const sendEmailWithOptions = async (mailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado: ', info.response);
        return { success: true, info };
    } catch (error) {
        console.error('Error al enviar email:', error);
        throw new Error('Error al enviar email');
    }
};

const sendEmail = async (req, res) => {
    try {
        const mailOptions = prepareEmailOptions(req.body);
        const result = await sendEmailWithOptions(mailOptions);
        res.status(200).json({ message: 'Correo enviado exitosamente', info: result.info });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const sendEmailFromService = async (emailData) => {
    try {
        const mailOptions = prepareEmailOptions(emailData);
        const result = await sendEmailWithOptions(mailOptions);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

export { sendEmail, sendEmailFromService };
