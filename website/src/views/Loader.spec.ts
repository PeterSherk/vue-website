import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Loader from './Loader.vue'

test('Loader spinner is present', async () => {
	const loaderWrapper = mount(Loader)
	const loader = loaderWrapper.find('.loader')
	expect(loader.exists()).true
})
