const express = require('express')

const app = express()

// Endpoint di base per testare se il server è in esecuzione
app.get('/', (req, res) => {
    res.send('Server funzionante!')
})

// Scegli una porta per il server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`)
})
