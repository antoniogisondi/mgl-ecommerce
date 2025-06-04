require('dotenv').config()
const express = require('express');
const cors = require('cors')
const port = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/ping', (req,res) => {
    res.json({message: 'kitemmuuuuu'})
})

app.listen(port, () => {
    console.log(`Server disponibile su http://localhost:${port}`)
})