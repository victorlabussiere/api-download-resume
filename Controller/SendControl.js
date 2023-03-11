const MailServices = require("../Services/MailService")

module.exports = class SendControl {

    constructor(client) {
        this.server = {
            email: process.env.SERVER_MAIL,
            pass: process.env.PASS,
            port: process.env.SMTP_PORT,
            host: process.env.SMTP_HOST,
            adm: process.env.MAIL
        }
        this.client = client
    }

    sendMail() {
        const mailControl = new MailServices(this.client, this.server)

        try {

            mailControl.sendClient()
            mailControl.sendAdmin()

            return { status: 200 }
        } catch (err) { console.error('Erro', err) }
    }
}