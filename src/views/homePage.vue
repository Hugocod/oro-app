<template>
    <div class="wrapper">
        <h1>io sono la home</h1>
        <form @submit.prevent="submitValue">
            <input v-model="inputValue" type="text" placeholder="Inserisci un valore" />
            <button type="submit">Invia</button>
        </form>

        <button @click="deleteAllData">delete all</button>

        <div class="record-container">
            <h2 v-for="(item, index) in data" :key="index">{{ item.value }}</h2>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'HomePage',
    data() {
        return {
            inputValue: '',
            data: [],
        }
    },
    mounted() {
        this.created()
    },
    methods: {
        async submitValue() {
            try {
                const response = await axios.post('http://localhost:3000/submit-data', {
                    value: this.inputValue,
                })

                console.log('Risposta:', response.data)
                this.inputValue = '' // Resetta il valore dell'input dopo l'invio
            } catch (error) {
                console.error('Errore', error)
            }

            this.created()
        },

        async created() {
            try {
                const response = await axios.get('http://localhost:3000/get-data')
                this.data = response.data
                console.log(this.data)
            } catch (error) {
                console.error('Errore nel recuperare i dati:', error)
            }
        },
        async deleteAllData() {
            try {
                await axios.delete('http://localhost:3000/delete-all')
                console.log('Tutti i documenti sono stati cancellati.')
                // Aggiorna la UI o lo stato dell'applicazione se necessario
                this.created()
            } catch (error) {
                console.error('Errore durante la cancellazione dei documenti:', error)
            }
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
