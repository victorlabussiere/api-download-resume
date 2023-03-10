const nodemailer = require('nodemailer')
require('dotenv').config()

module.exports = class MailController {

    constructor(client) {
        this.server = {
            email: process.env.SERVER_MAIL,
            pass: process.env.PASS,
            port: process.env.SMTP_PORT,
            host: process.env.SMTP_HOST
        }

        this.transporter = nodemailer.createTransport({
            host: this.server.host,
            port: this.server.port,
            auth: {
                user: this.server.email,
                pass: this.server.pass
            }
        })

        this.myMail = process.env.MAIL
        this.client = { ...client }
    }

    getClientConfig() {
        const config = {
            from: this.server.email,
            to: this.client.email,
            replyTo: this.myMail,
            subject: 'Victor Labussiere | Javascript Developer',
            text: `Olá, ${this.client.name}! Recebi o seu e-mail e desde já agradeço pelo uso da minha plataforma. Irei ler a sua mensagem e, caso solicitado, retornarei o contato em breve.`,
            envelope: {
                from: this.server.email,
                to: this.client.email,
            }
        }
        return config
    }

    getAdmConfig() {
        const config = {
            from: this.server.email,
            to: this.myMail,
            replyTo: this.client.email,
            subject: `Mensagem recebida de ${this.client.name} através da plataforma Victor Labussiere JS DEV.`,
            text: `Mensagem do cliente ${this.client.name}: ${this.client.message}`,
            envelope: {
                from: this.server.email,
                to: this.myMail
            }
        }

        return config
    }

    async send() {
        try {
            const config = this.getClientConfig()
            const adminConfig = this.getAdmConfig()

            const sendClient = await this.transporter.sendMail(config, (err, info) => {
                if (err) return new Error({ message: err.message, error: err })
                return info
            })

            const sendAdm = await this.transporter.sendMail(adminConfig, (err, info) => {
                if (err) return new Error({ message: err.message, error: err })
                return info
            })

            return await (sendClient, sendAdm)
        } catch (err) {
            return {
                erro: err,
                message: err.message
            }
        }
    }
}
