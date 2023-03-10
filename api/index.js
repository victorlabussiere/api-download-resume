// Import packages
const [cors, express, path] = ['cors', 'express', 'path'].map(i => require(i))
const MailController = require("../Services/MailService")

const app = express()
const router = express.Router()

// Middlewares
app.use(cors())
app.use(express.json())

// Endpoints
router.get('/', (req, res) => {
    res.json({
        title: "API para download de arquivo .PDF"
    })
})

router.get('/download', async (req, res) => {

    const file = await path.join(__dirname, '../static', 'curriculo-victor.pdf')

    try {
        if (!res) throw new Error()

        return res.download(file)
            .catch(err => new Error({ message: err.message, error: err }))

    } catch (err) {
        return {
            message: 'Não foi possível realizar o download',
            error: err
        }
    }
})

router.post('/mail', async (req, res) => {
    const client = { ...req.body }
    const mail = new MailController(client)

    try {

        if (!res) throw new Error()
        const send = async () => {
            await mail.sendClient()
            await mail.sendAdmin()
            return void (0)
        }

        await send()
        return res.json({ message: 'Enviado' })

    } catch (err) {
        return {
            message: err.mesasge,
            error: err
        }
    }

})

// Server
app.use(router)
const port = process.env.PORT || 3001
app.listen(port, () => {
    return console.log(`Server running at port http://localhost:${port}`)
})
