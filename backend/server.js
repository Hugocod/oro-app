const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors()) // Gestisce CORS per lo sviluppo cross-origin
app.use(bodyParser.json()) // Analizza le richieste JSON in arrivo

// Connessione a MongoDB
mongoose.connect('mongodb://localhost:27017/oro', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// Definisci un modello Mongoose per i dati
const DataModel = mongoose.model('Data', new mongoose.Schema({ value: String }))

// Endpoint per ricevere i dati
app.post('/submit-data', async (req, res) => {
    try {
        const newData = new DataModel({ value: req.body.value })
        await newData.save()
        res.status(201).send('Dato salvato')
    } catch (error) {
        res.status(500).send('Errore nel salvare il dato')
    }
})

// Endpoint per recuperare i dati
app.get('/get-data', async (req, res) => {
    try {
        const data = await DataModel.find()
        res.json(data)
    } catch (error) {
        res.status(500).send('Errore durante il recupero dei dati')
    }
})

// Endpoint per cancellare tutti i documenti
app.delete('/delete-all', async (req, res) => {
    try {
        await DataModel.deleteMany({}) // Cancella tutti i documenti
        res.status(200).send('Tutti i documenti sono stati cancellati.')
    } catch (error) {
        res.status(500).send('Errore durante la cancellazione dei documenti')
    }
})

const PORT = 3000 // Scegli una porta per il server
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`)
})
