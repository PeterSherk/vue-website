import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Cooking from './Cooking.vue'
import WorkInProgress from '@/views/WorkInProgress.vue'

describe('Cooking.vue', () => {
    const wrapper = mount(Cooking, {
      global: {
        components: {
          WorkInProgress
        },
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  test('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('renders WorkInProgress component', () => {
    expect(wrapper.findComponent(WorkInProgress).exists()).toBe(true)
  })
})