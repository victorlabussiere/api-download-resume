const nodemailer = require('nodemailer')
require('dotenv').config()

module.exports = class MailServices {

    constructor(client, server) {
        this.server = { ...server }

        this.transporter = nodemailer.createTransport({
            host: this.server.host,
            port: this.server.port,
            auth: {
                user: this.server.email,
                pass: this.server.pass
            }
        })

        this.myMail = this.server.adm
        this.client = { ...client }
    }

    _getClientConfig() {
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

    _getAdmConfig() {
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
            const config = this._getClientConfig()
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
            const adminConfig = this._getAdmConfig()
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
