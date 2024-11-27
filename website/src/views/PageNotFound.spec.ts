import { mount, RouterLinkStub } from "@vue/test-utils";
import { expect, test } from 'vitest';
import PageNotFound from "./PageNotFound.vue";
import GenericError from "@/components/GenericError.vue";

test('GenericError is loaded with proper content', async () => {
  const pageNotFoundWrapper = mount(PageNotFound, {
    components: {
      GenericError
    },
    global: {
      components: {
        'router-link': RouterLinkStub
      },
    },
  });
  const genericError = pageNotFoundWrapper.findComponent({name: 'GenericError'});
  const inputProps = genericError.props();
  expect(genericError.exists()).true;
  expect(inputProps.errorMessage).toBe('Oops! Page Not Found.')
  expect(inputProps.errorPicturePath).toBe('https://api.petersherk.com/img/moose_404.jpeg')
  expect(inputProps.altText).toBe('moose 404')
  expect(inputProps.navigationText).toBe('Go Home')
  expect(inputProps.navigationPath).toBe('/')
});