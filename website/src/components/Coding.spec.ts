import { mount, RouterLinkStub, VueWrapper } from '@vue/test-utils'
import { describe, expect, test, beforeEach } from 'vitest'
import Coding from './Coding.vue'
import Loader from '@/views/Loader.vue'
import GenericError from './GenericError.vue'

let codingWrapper: VueWrapper

describe('Coding.vue tests', () => {
	beforeEach(() => {
		codingWrapper = mount(Coding, {
			components: {
				GenericError,
				Loader
			},
			global: {
				components: {
					'router-link': RouterLinkStub
				},
				stubs: {
					FontAwesomeIcon: true
				}
			}
		})
	})

	test('displays error message when API call fails', async () => {
		await codingWrapper.setData({ errored: true, loading: false })
		await codingWrapper.vm.$nextTick()
		expect(codingWrapper.findComponent({ name: 'GenericError' }).exists()).toBe(true)
	})

	test('displays projects when API call succeeds', async () => {
		const projects = [
			{ id: 1, name: 'Project A', company: 'Company X', year: 2022 },
			{ id: 2, name: 'Project B', company: 'Company Y', year: 2023 }
		]
		await codingWrapper.setData({ projects, loading: false })
		await codingWrapper.vm.$nextTick()
		expect(codingWrapper.findAll('.card').length).toBe(2)
		expect(codingWrapper.text()).toContain('Project A')
		expect(codingWrapper.text()).toContain('Project B')
	})
})
