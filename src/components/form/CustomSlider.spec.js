import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Quasar, QSlider } from 'quasar'

import CustomSlider from './CustomSlider.vue'

const props = {
  modelValue: 1,
  min: 1,
  max: 5
}

describe('CustomSlider', () => {
  const wrapper = mount(CustomSlider, {
    global: {
      plugins: [Quasar]
    },
    props
  })

  it('renders properly', () => {
    const slider = wrapper.findComponent(CustomSlider)
    expect(slider.exists()).toBeTruthy()
  })

  it('emmits the inputed value when user sets the value', async () => {
    const slider = wrapper.findComponent(QSlider)
    await wrapper.vm.setValue(4)
    
    expect(slider.props().modelValue).toEqual(4)
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([4])
  })
})
