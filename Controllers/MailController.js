const MailController = require('../Services/MailService')

module.exports = class MailsController {
    constructor(obj) {
        this.data = {
            ...obj
        }
    }

    setSendMessage() {
        const message = this.data.message
    }
}