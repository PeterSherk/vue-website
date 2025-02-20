import { mount, RouterLinkStub } from "@vue/test-utils";
import { expect, test } from 'vitest';
import Home from "./Home.vue";

test('Home displays Banner and Banner About ', () => {
  const homeWrapper = mount(Home, {
    global: {
      components: {
        'RouterLink': RouterLinkStub
      },
      stubs: {
        FontAwesomeIcon: true
      }
    }
  });
  const banner = homeWrapper.findComponent({ name: 'app-banner' });
  const bannerAbout = homeWrapper.findComponent({ name: 'app-bannerabout' });
  expect(banner).toBeDefined()
  expect(bannerAbout).toBeDefined();
});