import './styles.css';

const cookieCatTemplate = (name, values, allowed) => `
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

export class CookieInterceptor {
  constructor(options) {
    const defaults = {};
    this.options = Object.assign(defaults, options);
    // setting to a past date effectively disables the cookie
    this.resetDate = 'Thu, 01-Jan-1970 00:00:01 GMT';
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

  initUI(container) {
    // options are already rendered, skip.
    if (document.getElementById('ci-options') !== null) {
      return;
    }

    this.parentEl;
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
      if (control.name === 'ci-necessary') {
        control.checked = true;
        control.disabled = true;
      } else {
        control.addEventListener('change', this.optionChange.bind(this));
      }
    });

    submit.addEventListener('click', this.destroyUI.bind(this));
  }

  optionChange() {
    const query = document.querySelectorAll('input.ci__input:checked');
    this.options.allowedCategories = [].slice
      .call(query)
      .map(e => e.name.split('-')[1]);

    this.saveAllowedCategories();
    this.maybeSetCollectedCookies();
  }

  getCookiesFromCategories() {
    let whitelist = [];
    this.options.allowedCategories.forEach(function(e) {
      whitelist = [].concat.apply(whitelist, ciAvailableCookies[e]);
    });
    return whitelist;
  }

  saveAllowedCategories() {
    window.localStorage.setItem(
      'allowedCategories',
      this.options.allowedCategories.join(',')
    );
  }

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
      const inDoc = this.getCookieKeys();
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

  // This function will attempt to remove a cookie from all paths.
  eraseCookieFromAllPaths(name) {
    let path = '/';

    // Try without path and domain first
    document.cookie = `!${name}=; expires=${this.resetDate};`;

    // Cookies that were set with path and/or domain need to be reset with
    // those same values otherwise they will be converted to session cookies
    location.pathname.split('/').forEach(chunk => {
      path += path.substr(-1) === '/' ? chunk : '/' + chunk;
      document.cookie = `!${name}=; expires=${this.resetDate}; path=${path}; domain=.${window.location.hostname}`;
      document.cookie = `!${name}=; expires=${this.resetDate}; path=${path}; domain=${window.location.hostname}`;
      document.cookie = `!${name}=; expires=${this.resetDate}; path=${path};`;
    });
  }

  /**
   * Based on keys() method from https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie/Simple_document.cookie_framework
   */
  getCookieKeys() {
    return document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '')
      .split(/\s*(?:\=[^;]*)?;\s*/)
      .map(e => decodeURIComponent(e));
  }

  destroyUI() {
    // set options from checkboxes
    this.optionChange();
    this.parentEl.removeChild(document.getElementById('ci-options'));
  }
}

window.cookieInterceptor = new CookieInterceptor({
  localStorageKey: 'allowedCategories',
  strict: true,
  l10n: window['ci_l10n'],
  categories: window['ciAvailableCookies'],
  collectedCookies: window['ciCollectedCookies']
});
