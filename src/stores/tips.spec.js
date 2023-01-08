import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTipsStore } from "@/stores/tips.js";

describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('calculates the correct information based on the input', async () => {
    const tipsStore = useTipsStore()
    
    tipsStore.entry = {
      currency: 'EUR',
      value: 250,
      tipValue: 10,
      dividers: 2
    }

    await tipsStore.calculateTipsResult()

    expect(tipsStore.result.account).toEqual(250.00)
    expect(tipsStore.result.tip).toEqual(25.00)
    expect(tipsStore.result.total).toEqual(275.00)
    expect(tipsStore.result.amountPerPerson).toEqual(137.50)
  })
})
