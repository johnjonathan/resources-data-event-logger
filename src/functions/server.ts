import express from 'express'

const app = express()

app.get('/hi', (request, response) => {
    return response.json({ message: `Hello ${process.env.EVENT_SOURCE_ID}` })
})

app.listen(3000)
