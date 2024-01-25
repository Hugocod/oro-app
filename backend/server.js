const express = require('express')
const mongoose = require('mongoose')

const app = express()

// Connessione a MongoDB
const mongoDBUri = process.env.MONGODB_URI // Assicurati di impostare questa variabile d'ambiente
mongoose
    .connect(mongoDBUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connesso a MongoDB')
    })
    .catch(err => {
        console.error('Errore durante la connessione a MongoDB:', err)
    })

// Endpoint di base per testare se il server è in esecuzione
app.get('/', (req, res) => {
    res.send('Server funzionante!')
})

// Scegli una porta per il server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`)
})
