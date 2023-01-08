import { defineStore } from 'pinia'
import axios from '@/resources/axios'
import { convertToBRL } from '@/resources/queries'

export const useTipsStore = defineStore({
  id: 'tips',
  state: () => ({
    entry: {
      currency: 'EUR',
      value: 0,
      tipValue: 10,
      dividers: 2
    },
    result: {
      account: 0,
      tip: 0,
      total: 0,
      amountPerPerson: 0,
      totalBrl: 0
    },
    loadingConversion: false
  }),
  getters: {
    currencyUnit: (state) => {
      const signals = {
        EUR: "€",
        USD: "$",
      };

      return signals[state.entry.currency]
    },
  },
  actions: {
    calculateTipsResult () {
      this.result.account = this.entry.value
      this.result.tip = (this.entry.value * this.entry.tipValue / 100)
      this.result.total = (this.result.account + this.result.tip)
      this.result.amountPerPerson = (this.result.total / this.entry.dividers)

      this.searchBrlValue()
    },
    async searchBrlValue () {
      const query = {
        query: convertToBRL(this.entry.currency)
      }

      this.loadingConversion = true

      const { data } = await axios.post('/graphql', query)
      this.result.totalBrl = this.result.amountPerPerson / data.data.currencyConversion.conversions[0].rate

      this.loadingConversion = false
    }
  }
})
