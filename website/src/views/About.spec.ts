import { mount } from "@vue/test-utils";
import About from "./About.vue";
import { expect, test } from 'vitest';

test('About text is present and correct', async () => {
  const aboutWrapper = mount(About);
  const aboutContent = aboutWrapper.find('.content');
  expect(aboutContent.exists()).true;
  expect(aboutContent.text()).toMatchSnapshot();
});