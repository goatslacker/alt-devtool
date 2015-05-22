# Alt's Chrome Devtool

> A developer tool extension for debugging your Alt flux applications

If you'd like to install this yourself without going through the chrome store
then visit this link:

https://cdn.rawgit.com/goatslacker/alt-devtool/master/dist/alt-dev.crx


## Installing

Open up Chrome extensions. Drag the extension onto there. Accept the ridiculous permissions.

In your alt app you'll need to use [chromeDebug](https://github.com/goatslacker/alt/blob/master/src/utils/chromeDebug.js)

```js
var Alt = require('alt');
var chromeDebug = require('alt/utils/chromeDebug');

var alt = new Alt();
chromeDebug(alt);

module.exports = alt;
```


## Permissions

This extension requires the ability to "Read and change all your data on the websites you visit" according to Google.

This extension just needs some JavaScript to detect whether Alt exists on the page or not. Having access to all data on websites you visit is way more power than this extension actually needs to work. Ideally, the extension would just have access to Alt if it exists or not.

The source code will always be included here and the extension as well should you wish to inspect it.


## Feedback

If you have feedback or issues then please [file an issue](https://github.com/goatslacker/alt-devtool/issues).


## Screenshots

All dispatches. Search. Rollback. Time Travel debugging.

![Dispatches](screenshots/1.png)

Viewing stores. Snapshots. Bootstrap. Flush.

![Stores](screenshots/2.png)


## License

[MIT](http://josh.mit-license.org)
