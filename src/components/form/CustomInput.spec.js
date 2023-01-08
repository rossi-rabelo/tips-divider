import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Quasar, QInput } from 'quasar'

import CustomInput from './CustomInput.vue'

describe('CustomInput', () => {
  const wrapper = mount(CustomInput, {
    global: {
      plugins: [Quasar]
    }
  })

  it('renders properly', () => {
    const input = wrapper.findComponent(CustomInput)
    expect(input.exists()).toBeTruthy()
  })

  it('emmits the inputed value when user types in', async () => {
    const qInput = wrapper.findComponent(QInput)

    await qInput.setValue(1)
    
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([1])
  })
})
