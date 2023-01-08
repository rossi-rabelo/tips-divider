import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { Quasar } from 'quasar'

import LeTipView from './LeTipView.vue'

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

describe('LeTipView', () => {
  const wrapper = mount(LeTipView, {
    global: {
      plugins: [Quasar, createTestingPinia({
        createSpy: vi.fn,
        stubActions: false
      })]
    }
  })

  it('renders properly', () => {
    const entryPanel = wrapper.findComponent(LeTipView)
    expect(entryPanel.exists()).toBeTruthy()
  })

  it('shows just the entry panel when use opens the app on mobile view', async () => {
    const resultPanel = wrapper.find('#result-panel')

    expect(resultPanel.classes()).toContain('hidePanel')
  })
})
