import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { Quasar, QBtnToggle, QBtn } from 'quasar'

import EntryPanel from './EntryPanel.vue'
import CustomInput from '@/components/form/CustomInput.vue'
import CustomSlider from '@/components/form/CustomSlider.vue'

describe('EntryPanel', () => {
  const wrapper = mount(EntryPanel, {
    global: {
      plugins: [Quasar, createTestingPinia({
        createSpy: vi.fn,
        stubActions: false
      })]
    }
  })

  it('renders properly', () => {
    const entryPanel = wrapper.findComponent(EntryPanel)
    expect(entryPanel.exists()).toBeTruthy()
  })

  it('calls the calculate function after changing any form component', async () => {
    
    const toggle = wrapper.findComponent(QBtnToggle)
    const inputValue = wrapper.findComponent(CustomInput)
    const sliders = wrapper.findAllComponents(CustomSlider)
    
    await inputValue.setValue(11)
    await toggle.findAllComponents(QBtn)[1].trigger('click')
    await sliders[0].setValue(12)
    await sliders[1].setValue(4)

    expect(wrapper.vm.tipsStore.calculateTipsResult).toBeCalledTimes(4)
  })
})
