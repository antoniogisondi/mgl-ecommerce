const nodemailer = require('nodemailer')
const contactRequestTemplate = require('./contactRequestTemplate')

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST, // es: smtp.tuodominio.it
    port: process.env.MAIL_PORT, // o 587 (dipende dal provider)
    secure: true, // true per 465, false per 587
    auth: {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASS  
    }
})

const sendContactEmail = async ({name, surname, email, phone, message, courseId, course}) => {
    const mailOptions = {
        from: `"Modulo contatto" <${process.env.MAIL_NOREPLY}>`,
        to: process.env.MAIL_RECEIVER,
        subject: '📩 Nuova richiesta informazioni corso',
        html: contactRequestTemplate({name, surname, email, phone, message, courseId, course})
    }

    await transporter.sendMail(mailOptions)
}

module.exports = sendContactEmail