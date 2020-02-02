# Cookie Interceptor

A fuzz & dependency free, all vanilla, minimal cookie detector and interceptor.

This code is intended as a starting point and should be extended and modified to suit specific needs.

Follow [this link](https://brunofenzl.github.io/cookie-interceptor/) to see it in action

## Using it

This library consist oftwo parts: the library itself installable with npm `npm install cookie-interceptor --save` and a snippet that should be placed into the `<head>` of your page.

After installing it, import in your project as fllows:

```
import { CookieInterceptor } from 'cookie-interceptor';
```

or as a CommonJS module:

```
const { CookieInterceptor } = require('cookie-interceptor');
```

and place following snippet in every page you want to intercept cookies:

```
var _ci=Object.getOwnPropertyDescriptor(Document.prototype,"cookie")||Object.getOwnPropertyDescriptor(HTMLDocument.prototype,"cookie");function checkStorage(){var t=[];return(localStorage.getItem("allowedCategories")||"").split(",").forEach(function(e){t=[].concat.apply(t,ciAvailableCookies[e])}),t}_ci&&_ci.configurable&&Object.defineProperty(document,"cookie",{get:function(){return _ci.get.call(d)},set:function(e){var t=e.split("=")[0];"!"===e[0]?_ci.set.call(d,e.slice(1)):-1<checkStorage().indexOf(t)?_ci.set.call(d,e):ciCollectedCookies.push(e)}});
```

or unminified:

```
var _ci =
  Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') ||
  Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');

function checkStorage() {
  var whitelist = [];
  var categories = localStorage.getItem('allowedCategories') || '';
  categories.split(',').forEach(function(e) {
    whitelist = [].concat.apply(whitelist, ciAvailableCookies[e]);
  });
  return whitelist;
}

if (_ci && _ci.configurable) {
  Object.defineProperty(document, 'cookie', {
    get: function() {
      return _ci.get.call(d);
    },
    set: function(val) {
      var c = val.split('=')[0]; // first segment should be the cookie name
      // cookie marked for removal
      if (val[0] === '!') {
        _ci.set.call(d, val.slice(1));
      } else if (checkStorage().indexOf(c) > -1) {
        _ci.set.call(d, val);
      } else {
        ciCollectedCookies.push(val);
      }
    }
  });
}
```

This code will hijack document.cookie and intercept every attempt to set a cookie, for example `document.cookie = 'my_cookie=value'`.

Cookies not whitelisted will be blocked.

The constructor `CookieInterceptor()` expects a configuration object with the following properties:

```
{
  localStorageKey: string,
  strict: boolean,
  l10n: object,
  categories: object,
  collectedCookies: array,
}

```

### localStorageKey: string

Key in the localStorage where the cookie categories whitelist will be stored.

### strict: boolean

Boolean indicating wether cookies that were previously allowed should be deleted once the user revokes it's permission.

Default's to false.

### l10n: object

Object containing translated strings: This object consists of the following properties:

```
{
  description: string,
  saveBtn: string,
  categories: {
    necessary: string,
    functional: string,
    statistical: string,
    marketing: string
  }
}
```

Where the keys inside `categories: {}` should be the same keys in `config.categories` object. See below.

### categories: object

Object holding all categories and their respective cookies.

```
{
  necessary: ['cookie1', 'cookie2', ...],
  functional: ['cookie3', ...],
  statistical: ['cookie4', ...],
  marketing: ['cookie5', 'cookie6', ...],
  ...
};
```

### collectedCookies: array

An array that will hold all cookies that were intercepted and blocked.
