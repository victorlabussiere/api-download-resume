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
            text: `Nome do usuário: ${this.client.name}.\n Mensagem: ${this.client.message}`,
            envelope: {
                from: this.server.email,
                to: this.myMail
            }
        }

        return config
    }

    async sendClient() {
        try {
            const config = this.getClientConfig()
            return await this.transporter.sendMail(config, (err, info) => {
                if (err) return new Error({ message: err.message, error: err })
                return info
            }).then(res => {
                return {
                    message: 'sucess',
                    data: res.info
                }
            }).catch(err => new Error(err))

        } catch (err) {
            return {
                erro: err,
                message: err.message
            }
        }
    }

    async sendAdmin() {
        try {
            const adminConfig = this.getAdmConfig()
            return await this.transporter.sendMail(adminConfig, async (err, info) => {
                if (err) return new Error({ message: err.message, error: err })
                return info
            }).then(res => {
                return {
                    message: 'sucess',
                    data: res.info
                }
            }).catch(err => new Error(err))


        } catch (err) {
            return {
                message: err.message,
                error: err
            }
        }
    }
}
