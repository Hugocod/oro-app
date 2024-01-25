const express = require('express')
const mongoose = require('mongoose')

const app = express()

// Middleware per analizzare i corpi delle richieste JSON
app.use(express.json())

// Connessione a MongoDB
const mongoDBUri = process.env.MONGODB_URI // Assicurati di impostare questa variabile d'ambiente
mongoose
    .connect(mongoDBUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connesso a MongoDB'))
    .catch(err => console.error('Errore durante la connessione a MongoDB:', err))

// Schema e modello Mongoose per gli utenti
const userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
})

const User = mongoose.model('User', userSchema)

// Endpoint di base per testare se il server è in esecuzione
app.get('/', (req, res) => {
    res.send('Server funzionante!')
})

// Endpoint per creare un utente
app.post('/submit-data', async (req, res) => {
    try {
        const newUser = new User({ email: req.body.email })
        await newUser.save()
        res.status(201).json({ message: 'Utente creato con successo' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Scegli una porta per il server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`)
})
