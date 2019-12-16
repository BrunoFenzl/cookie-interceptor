import { CookieInterceptor } from '../src';

const config = {
  localStorageKey: 'allowedCategories',
  strict: true,
  l10n: window['ci_l10n'],
  categories: window['ciAvailableCookies'],
  collectedCookies: window['ciCollectedCookies']
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CookieInterceptor(config);
  });
} else {
  new CookieInterceptor(config);
}
