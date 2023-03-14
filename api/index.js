// Import packages
const [cors, express, path] = ['cors', 'express', 'path'].map(i => require(i))
const app = express()
const router = express.Router()

function main() {

    app.use(cors())
    app.use(express.json())
    app.use(router)

    // Endpoints
    router.get('/', (req, res) => {
        res.json({
            title: "API para download de arquivo .PDF"
        })

        return res.end()
    })

    router.get('/download', async (req, res) => {

        const file = await path.join(__dirname, '../static', 'curriculo-victor.pdf')

        try {

            if (!res) throw new Error()
            res.download(file)
                .catch(err => new Error({ message: err.message, error: err }))

            return res.status(200)

        } catch (err) {
            return {
                message: 'Não foi possível realizar o download',
                error: err
            }
        }
    })

    router.post('/mail', async (req, res) => {
        const client = { ...req.body }
        const SendControl = require('../Controller/SendControl')

        try {
            const sendControl = new SendControl(client)
            const response = sendControl.sendMail()

            if (response.status !== 200) throw new Error('Erro na operação.')
            else return res.end('Operaçoes realizadas com sucesso.')
        }
        catch (err) {
            return {
                message: err.mesasge,
                error: err
            }
        }

    })

    const port = process.env.PORT || 3001
    app.listen(port, () => {
        console.log(`Server running at port http://localhost:${port}`)
        return void (0)
    })
}

main()