<template>
    <div class="wrapper">
        <h1 class="text-4xl p-8">Calcolo calo</h1>
        <form @submit.prevent="submitValue" class="flex justify-between bg-gray-100 p-4">
            <div class="flex flex-col items-start">
                <label for="nomeCliente">Nome Cliente:</label>
                <input type="text" id="nomeCliente" v-model="formData.nomeCliente" />
            </div>

            <div class="flex flex-col items-start">
                <label for="oroPerLavori">Oro per lavori:</label>
                <input type="number" id="oroPerLavori" v-model.number="formData.oroPerLavori" />
            </div>

            <div class="flex flex-col items-start">
                <label for="oroCalo">Oro + calo:</label>
                <input type="number" id="oroCalo" v-model.number="formData.oroCalo" readonly="true" />
            </div>

            <div class="flex flex-col items-start">
                <label for="acconti">Acconti:</label>
                <input type="number" id="acconti" v-model.number="formData.acconti" />
            </div>

            <div class="flex flex-col items-start">
                <label for="costo">Costo:</label>
                <input type="number" id="costo" class="w-[70px]" v-model.number="formData.costo" />
            </div>

            <div class="flex flex-col items-start">
                <label for="saldo">Saldo:</label>
                <input type="number" id="saldo" v-model.number="formData.saldo" />
            </div>

            <button type="submit" @submit="submitValue" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">invia</button>
        </form>

        <button @click="deleteAllData" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">delete all</button>

        <!--
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
-->

        <div class="overflow-x-auto rounded-lg border border-gray-200">
            <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead class="ltr:text-left rtl:text-right">
                    <tr>
                        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Cliente</th>
                        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Oro per lavori</th>
                        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Oro + calo</th>
                        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Acconto</th>
                        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Costo</th>
                        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Saldo</th>
                        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Data aggiunta</th>
                        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Azioni</th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-200">
                    <tr v-for="(item, index) in data" :key="index">
                        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{ item.nomeCliente }}</td>
                        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{ item.oroPerLavori }}</td>
                        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{ item.oroCalo }}</td>
                        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{ item.acconti }}</td>
                        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{ item.costo }}</td>
                        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{ item.saldo }}</td>
                        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{ item.createdAt }}</td>
                        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            <button @click="deleteSingleRecord(item._id)">cancella</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'HomePage',
    data() {
        return {
            data: '',
            formData: {
                oroPerLavori: 0,
                oroCalo: 0,
                acconti: 0,
                costo: 0,
                saldo: 0,
                nomeCliente: '',
            },
        }
    },
    mounted() {
        this.created()
    },
    watch: {
        // Osserva le modifiche al campo oroPerLavori
        'formData.oroPerLavori'(newValue) {
            if (newValue > 0) {
                this.calcolaOroCalo()
            } else {
                this.formData.oroCalo = 0
            }
        },
    },
    methods: {
        async submitValue() {
            try {
                const response = await axios.post('http://localhost:3000/submit-data', this.formData)
                console.log('Risposta:', response.data)
            } catch (error) {
                console.error('Errore', error)
            }

            this.created()
        },

        async created() {
            try {
                const response = await axios.get('http://localhost:3000/get-data')
                this.data = response.data
                console.log(this.data[0]._id)
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

        async deleteSingleRecord(id) {
            try {
                await axios.delete(`http://localhost:3000/delete-data/${id}`)
                console.log('Tutti i documenti sono stati cancellati.')
                // Aggiorna la UI o lo stato dell'applicazione se necessario
                this.created()
            } catch (error) {
                console.error('Errore durante la cancellazione del documento:', error)
            }
        },

        calcolaOroCalo() {
            this.formData.oroCalo = (this.formData.oroPerLavori * 0.825) / 0.72
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
