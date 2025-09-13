import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import WorkInProgress from './WorkInProgress.vue'

test('Loader spinner is present', async () => {
	const workInProgressWrapper = mount(WorkInProgress, {
		global: {
			stubs: {
				FontAwesomeIcon: true
			}
		}
	})
	const title = workInProgressWrapper.find('.title').text()
	const subtitle = workInProgressWrapper.find('.subtitle').text()
	expect(title).toBe('Page under development')
	expect(subtitle).toBe('New content is always updated as soon as possible!')
})
