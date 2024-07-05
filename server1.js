const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('Server running on port 3000')
})

app.get('/health', (req, res) => {
    res.send(true)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})