import { mount, RouterLinkStub } from "@vue/test-utils";
import { expect, test } from 'vitest';
import BannerAbout from "./BannerAbout.vue";

test('Banner About', () => {
  const bannerAboutWrapper = mount(BannerAbout, {
    global: {
      components: {
        'RouterLink': RouterLinkStub
      },
      stubs: {
        FontAwesomeIcon: true
      }
    }
  });

});