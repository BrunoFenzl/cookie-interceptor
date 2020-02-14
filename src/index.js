import './styles.css';

/**
 * Function to generate markup for one single category
 * @param {string} name Name of the category to be displayed
 * @param {boolean} checked Wether this checkbox should be rendered checked or not
 * @returns {string} Markup of single category
 */
const categoryTemplate = (name, checked) => `
  <div id="ci-${name}" class="ci__category">
    <div class="ci__content">
      <strong>${name}</strong>
    </div>
    <div class="ci__control">
      <input
        class="ci__input"
        type="checkbox"
        id="ci-${name}"
        name="ci-${name}"
        ${checked ? ' checked' : ''}>
      <label for="ci-${name}"></label>
    </div>
  </div>
`;

/**
 * Function to generate the popup markup.
 * @param {string} categories Markup of the categories to be shown
 * @param {object} l10n Object holding translations
 * @param {string} classes String holding css classnames
 * @returns {string} Markup of the popup displaying options
 */
const popupTemplate = (categories, l10n, classNames) => {
  return `
    <div id="ci-options" class="ci ${classNames}">
      <div class="ci__inner">
        <p>
        ${l10n.description}
        </p>
        <div class="ci__controls">
          ${categories}
          <button type="submit" id="ci-submit" class="btn btn-success ci__submit">${l10n.saveBtn}</button>
        </div>
      </div>
    </div>
  `;
};

/**
 * Based on keys() method from https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie/Simple_document.cookie_framework
 */
function getCookieKeys() {
  return document.cookie
    .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '')
    .split(/\s*(?:\=[^;]*)?;\s*/)
    .map(e => decodeURIComponent(e));
}

// setting to a past date effectively disables the cookie
const resetDate = 'Thu, 01-Jan-1970 00:00:01 GMT';
export class CookieInterceptor {
  /**
   * Constructor expects configuration object
   * @param {object} options Configuration options
   * @returns {CookieInterceptor} new CookieInterceptor instance
   */
  constructor(options) {
    const defaults = {
      localStorageKey: 'allowedCategories',
      strict: true,
      l10n: window['ci_l10n'],
      categories: window['ciAvailableCookies'],
      collectedCookies: window['ciCollectedCookies'],
      categoryTemplate,
      popupTemplate
    };
    this.options = Object.assign(defaults, options);

    // try to retrieve
    const storedCategories = window.localStorage.getItem(
      this.options.localStorageKey
    );

    this.options.allowedCategories = storedCategories
      ? storedCategories.split(',')
      : [];

    if (!storedCategories) {
      // If this key is not present, means either it's the first visit
      // or localStorage was cleaned up.
      this.render();
    } else {
      // Otherwise, set all cookies from the categories found in the localstorage,
      // optionaly removing not allowed/old cookies.
      this.updateCookies();
    }
  }

  /**
   * Creates the UI and renders it in the given selector or in the body if no selector was given.
   * @param {null | string | Node} container Element were popup should be rendered. Could be a string representing a selector or an actual node.
   */
  render(container) {
    // options are already being rendered, skip.
    if (document.getElementById('ci-options') !== null) {
      return;
    }

    let classNames = '';
    // nothing passed. Defaults to body
    if (!container) {
      this.parentEl = document.body;
    } else if (typeof container === 'string') {
      this.parentEl = document.querySelector(container);
      classNames = 'ci--relative';
    } else if (container.nodeType === Node.ELEMENT_NODE) {
      this.parentEl = container;
      classNames = 'ci--relative';
    }

    // shortcut
    const o = this.options;

    const categoriesMarkup = Object.keys(o.categories)
      // only categories with cookies inside
      .filter(categoryName => {
        return (
          o.categories[categoryName].length &&
          o.categories[categoryName][0] !== ''
        );
      })
      // convert array into markup
      .reduce((markup, categoryName) => {
        const checked = o.allowedCategories.indexOf(categoryName) > -1;

        return (markup += o.categoryTemplate(categoryName, checked));
      }, '');

    // render
    const range = document.createRange();
    range.selectNode(this.parentEl);
    const compiled = o.popupTemplate(categoriesMarkup, o.l10n, classNames);

    const documentFragment = range.createContextualFragment(compiled);
    this.parentEl.appendChild(documentFragment);

    const controls = [].slice.call(
      document.querySelectorAll('input[type=checkbox]')
    );
    const submit = document.getElementById('ci-submit');

    controls.forEach(control => {
      // 'Necessary' cookies are not modifiable.
      // Disable this checkbox
      if (control.name === 'ci-necessary') {
        control.checked = true;
        control.disabled = true;
      } else {
        control.addEventListener('change', () => {
          o.allowedCategories = controls
            .filter(el => el.checked)
            .map(e => e.name.split('-')[1]); // remove the 'ci-' part

          // Write the choosen categories to localStorage
          window.localStorage.setItem(
            o.localStorageKey,
            o.allowedCategories.join(',')
          );
          // And set the cookies
          this.updateCookies();
        });
      }
    });

    submit.addEventListener('click', this.destroy.bind(this));
  }

  /**
   * Remove the UI from the DOM
   */
  destroy() {
    this.parentEl.removeChild(document.getElementById('ci-options'));
  }

  /**
   * Sets all cookies listed in each acepted category and deletes all others that are not whitelisted
   */
  updateCookies() {
    let cookiesConsented = [];
    // Returns an array with all cookies from all categories that were allowed by the user
    this.options.allowedCategories.forEach(e => {
      cookiesConsented = [].concat.apply(
        cookiesConsented,
        this.options.categories[e]
      );
    });

    /*
			Some scripts may try to set the same cookie a few times (e.g. google analytics)
			adding duplicate entries to collectedCookies. Let's dedupe them here.
		*/
    const dedupe = {};
    this.options.collectedCookies.forEach(e => {
      const c = e.split('=')[0];
      dedupe[c] = e;
    });

    // remove cookies from the document
    // that are't in the consented list
    if (this.options.strict) {
      const inDoc = getCookieKeys();
      inDoc.forEach(key => {
        if (cookiesConsented.indexOf(key) === -1) {
          this.eraseCookieFromAllPaths(key);
        }
      });
    }

    Object.keys(dedupe) // get all cookies already set for this domain
      .forEach(key => {
        // set the cookie if present in the list the user consented
        if (cookiesConsented.indexOf(key) > -1) {
          document.cookie = dedupe[key];
        }
      });
  }

  /**
   * This function will attempt to remove a cookie from all paths.
   * @param {string} name Cookie name
   */
  eraseCookieFromAllPaths(name) {
    let path = '/';

    // Try without path and domain first
    document.cookie = `!${name}=; expires=${resetDate};`;

    // Cookies that were set with path and/or domain need to be reset with
    // those same values otherwise they will be converted to session cookies
    // instead of being immediately removed.
    location.pathname.split('/').forEach(chunk => {
      path += path.substr(-1) === '/' ? chunk : '/' + chunk;
      document.cookie = `!${name}=; expires=${resetDate}; path=${path}; domain=.${window.location.hostname}`; // try with path and generic subdomain
      document.cookie = `!${name}=; expires=${resetDate}; path=${path}; domain=${window.location.hostname}`; // try with path and domain
      document.cookie = `!${name}=; expires=${resetDate}; path=${path};`; // try only with path
    });
  }
}
