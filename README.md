# Rework Split Media [![Build Status](https://travis-ci.org/reworkcss/split-media.png)](https://travis-ci.org/reworkcss/split-media)

Split a stylesheet into multiple stylesheets.
You may want to use [rework-move-media](https://github.com/reworkcss/rework-move-media) prior to using this.

## API

### var stylesheets = split(parse(string)) || split(rework(string))

This module can be used with [rework](https://github.com/visionmedia/rework) or with [css-parse](https://github.com/visionmedia/css-parse).
If you use it with rework, be sure to not `rework().toString()`.

```js
var split = require('rework-split-media')

var stylesheets = split(
  rework('body { color: red }')
    .use(require('rework-move-media')())
)
```

`stylesheets` will be an object with `stylesheets[query] = stylesheet`.
If there's no media query, `query = ""`.
Thus, it'll look something like this:

```js
{
  "": {
    "type": "stylesheet",
    "rules": []
  },
  "(max-width: 960px)": {
    "type": "stylesheet",
    "rules": []
  }
}
```

Each stylesheet will be stripped of any @media queries.

### stringifying

You can stringify the stylesheets by using [css-stringify](https://github.com/visionmedia/css-stringify).

```js
var stringify = require('css-stringify')

var general = stringify(stylesheets[''])
var lte960px = stringify(stylesheets['(max-width: 960px)'])
```

Then you'll want to setup a build process to link them in your HTML appropriately:

```html
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" media="(max-width: 960px)" href="styles-lte-960-px.css">
```

If you want to concatenate them, you can do:

```js
var query = '(max-width: 960px)'
var all = general + '@media' + query + '{' + lte960px + '}'
```

## License

The MIT License (MIT)

Copyright (c) 2013 Jonathan Ong me@jongleberry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
