import express from 'express'
import 'dotenv/config'

const app = express()
const port = 9000

app.use(function (req, res, next) {
    const allowed = process.env.ALLOWED_KEY.split(',')
    const apiKey = req.headers['apikey']

    if (allowed.includes(apiKey)) {
        next()
    } else {
        res.status(401).json({ error: 'Unauthorized' })
    }
})

app.use(express.json())

// routes
app.post('/points', (req, res) => {
    console.log(req.body)
    res.status(200).send({ saved: true })
})


app.use(function (req, res, next) {
    res.status(400).json({ error: 'Bad Request' })
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
