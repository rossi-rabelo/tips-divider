import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { Quasar } from 'quasar'
import { flushPromises } from '@vue/test-utils'

import ResultPanel from './ResultPanel.vue'

import { useTipsStore } from "@/stores/tips.js";

const payload = {
  data: { data: {
    currencyConversion: {
      conversions: [
        {
          rate: 0.1797
        }
      ]
    }
  }}
}

vi.mock("@/resources/axios", () => {
  return {
    default: {
      post: vi.fn(() => payload),
    },
  };
});

describe('ResultPanel', () => {
  const wrapper = mount(ResultPanel, {
    global: {
      plugins: [Quasar, createTestingPinia({
        createSpy: vi.fn,
        stubActions: false
      })]
    }
  })

  it('renders properly', () => {
    const entryPanel = wrapper.findComponent(ResultPanel)
    expect(entryPanel.exists()).toBeTruthy()
  })

  it('show the calculated information', async () => {
    const tipsStore = useTipsStore()

    tipsStore.entry = {
      currency: 'EUR',
      value: 250,
      tipValue: 10,
      dividers: 2
    }

    tipsStore.calculateTipsResult()
    await flushPromises()

    expect(wrapper.find('.account').text()).toBe('250.00')
    expect(wrapper.find('.tip').text()).toBe('25.00')
    expect(wrapper.find('.total').text()).toBe('275.00')
    expect(wrapper.find('.amount-per-person').text()).toBe('137.50')
    expect(wrapper.find('.total-brl').text()).toBe('765.16')
  })
})
