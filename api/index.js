// Import packages
const [cors, express, path] = ['cors', 'express', 'path'].map(i => require(i))
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
    res.download(file)
})

router.post('/mail', async (req, res) => {

    try {
        const MailController = require("../Services/MailService")
        const client = { ...req.body }
        const mail = new MailController(client)

        await mail.send()

        return res.json({
            message: 'Mensagem enviada',
            status: 200
        })

    } catch (err) { return { message: err.mesasge, error: err } }

})

// Server
app.use(router)
const port = process.env.PORT || 3001
app.listen(port, () => {
    return console.log(`Server running at port http://localhost:${port}`)
})
