<template>
    <form @submit.prevent="submitValue">
        <div>
            <label for="UserEmail" class="block text-xs font-medium text-gray-700"> Email </label>
            <input type="text" v-model="dataEmail" id="UserEmail" placeholder="john@rhcp.com" class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
        </div>
        <button type="submit">submit</button>
    </form>
</template>

<script>
import axios from 'axios'

export default {
    name: 'HomePage',
    data() {
        return {
            dataEmail: '',
        }
    },
    mounted() {},

    methods: {
        async submitValue() {
            try {
                const payload = { email: this.dataEmail } // Crea un oggetto con la proprietà email
                const response = await axios.post('https://test-app-jcw6.onrender.com/submit-data', payload)
                console.log('Risposta:', response.data)
                console.log(this.dataEmail)
            } catch (error) {
                console.error('Errore', error)
            }
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
