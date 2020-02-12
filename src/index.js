import './styles.css';

/**
 * Function that returns the markup for one single category
 * @param {string} name Name of the category to be displayed
 * @param {string[]} allowed Array of strings of category names
 * @returns {string} Markup of single category
 */
const cookieCatTemplate = (name, allowed) => `
  <div id="ci-${name}" class="ci__category ${
  name === 'functional' ? 'ci__category--show' : ''
}">
    <div class="ci__content">
      <strong>${name}</strong>
    </div>
    <div class="ci__control">
      <input
        class="ci__input"
        type="checkbox"
        id="ci-${name}"
        name="ci-${name}"
        ${allowed.indexOf(name) > -1 ? ' checked' : ''}>
      <label for="ci-${name}"></label>
    </div>
  </div>
`;

/**
 *
 * @param {object} available Object holding all available categories and their cookie arrays
 * @param {string[]} allowed Array of strings of category names
 * @param {object} l10n Object holding translations
 * @param {string} classes String holding css classnames
 * @returns {string} Markup of the popup displaying options
 */
const template = (available, allowed, l10n, classes) => `
  <div id="ci-options" class="ci ${classes}">
    <div class="ci__inner">
      <p>
      ${l10n.description}
      </p>
      <div class="ci__controls">
        ${Object.keys(available)
          .filter(
            c => available[c] && available[c].length && available[c][0] !== ''
          )
          .reduce(
            (a, c) => (a += cookieCatTemplate(c, available[c], allowed)),
            ''
          )}
        <button id="ci-submit" class="btn btn-success ci__submit">${
          l10n.saveBtn
        }</button>
      </div>
    </div>
  </div>
`;

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
    const defaults = {};
    this.options = Object.assign(defaults, options);

    const storedCategories = window.localStorage.getItem(
      this.options.localStorageKey
    );

    this.options.allowedCategories = storedCategories
      ? storedCategories.split(',')
      : [];

    // If this key is not present, means either it's the first visit
    // or localStorage was cleaned up. Either way, present the options.
    if (!storedCategories) {
      this.initUI();
    } else {
      this.maybeSetCollectedCookies();
    }
  }

  /**
   * Creates the UI and renders it in the given selector or in the body if no selector was given.
   * @param {null | string | Node} container Element were popup should be rendered. Could be a string representing a selector or an actual node.
   */
  initUI(container) {
    // options are already rendered, skip.
    if (document.getElementById('ci-options') !== null) {
      return;
    }

    let classes = '';
    // nothing passed. Defaults to body
    if (!container) {
      this.parentEl = document.body;
    } else if (typeof container === 'string') {
      this.parentEl = document.querySelector(container);
      classes = 'ci--relative';
    } else if (container.nodeType === Node.ELEMENT_NODE) {
      this.parentEl = container;
      classes = 'ci--relative';
    }

    // render
    const range = document.createRange();
    range.selectNode(this.parentEl);
    const compiled = template(
      this.options.categories,
      this.options.allowedCategories,
      this.options.l10n,
      classes
    );

    const documentFragment = range.createContextualFragment(compiled);
    this.parentEl.appendChild(documentFragment);

    const controls = [].slice.call(
      document.querySelectorAll('input.ci__input')
    );
    const submit = document.getElementById('ci-submit');

    controls.forEach(control => {
      // Necessary cookies are not modifiable
      if (control.name === 'ci-necessary') {
        control.checked = true;
        control.disabled = true;
      } else {
        control.addEventListener('change', () => {
          this.options.allowedCategories = controls
            .filter(el => el.checked)
            .map(e => e.name.split('-')[1]); // remove the 'ci-' part

          this.saveAllowedCategories(
            this.options.localStorageKey,
            this.options.allowedCategories
          );
          this.maybeSetCollectedCookies();
        });
      }
    });

    submit.addEventListener('click', this.destroyUI.bind(this));
  }

  /**
   * Returns an array with all cookies from all categories that were allowed by the user
   * @returns {string[]} Array with all cookies from all categories allowed
   */
  getCookiesFromCategories() {
    let whitelist = [];
    this.options.allowedCategories.forEach(function(e) {
      whitelist = [].concat.apply(whitelist, this.options.categories[e]);
    });
    return whitelist;
  }

  /**
   * Writes the whitelisted categories to localStorage.
   * @param {string} storageKey Key under the categories list should be written
   * @param {string[]} storageValues Array of strings with category names
   */
  saveAllowedCategories(storageKey, storageValues) {
    window.localStorage.setItem(storageKey, storageValues.join(','));
  }

  /**
   *
   */
  maybeSetCollectedCookies() {
    const cookiesConsented = this.getCookiesFromCategories();
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
   * @param {string} name Cookie key
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

  /**
   * Set's the current values
   */
  destroyUI() {
    // set options from checkboxes
    // this.saveAllowedCategories(
    //   this.options.localStorageKey,
    //   this.options.allowedCategories
    // );
    // this.maybeSetCollectedCookies();
    this.parentEl.removeChild(document.getElementById('ci-options'));
  }
}
