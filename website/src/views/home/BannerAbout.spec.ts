import { mount, RouterLinkStub } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import BannerAbout from './BannerAbout.vue'

test('Banner About opens email, linkedin and github', async () => {
	const windowSpy = vi.spyOn(window, 'open').mockImplementation(() => {
		return null
	})
	const bannerAboutWrapper = mount(BannerAbout, {
		global: {
			components: {
				RouterLink: RouterLinkStub
			},
			stubs: {
				FontAwesomeIcon: true
			}
		}
	})

	const emailButton = bannerAboutWrapper.find('[aria-label="Click to send email to Peter"]')
	expect(emailButton.exists()).toBe(true)
	await emailButton.trigger('click')
	expect(windowSpy).toHaveBeenCalledWith('mailto:psherk95@gmail.com', '_parent')

	const githubButton = bannerAboutWrapper.find(
		'[aria-label="Click to see Peter\'s LinkedIn Profile"]'
	)
	expect(githubButton.exists()).toBe(true)
	await githubButton.trigger('click')
	expect(windowSpy).toHaveBeenCalledWith('https://www.linkedin.com/in/peter-sherk', '_blank')

	const linkedInButton = bannerAboutWrapper.find('[aria-label="Click to see Peter\'s GitHub"]')
	expect(linkedInButton.exists()).toBe(true)
	await linkedInButton.trigger('click')
	expect(windowSpy).toHaveBeenCalledWith('https://github.com/PeterSherk', '_blank')
})
