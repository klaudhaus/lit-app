# lit-imp

> Build reusable, stateful content for web sites and applications

## Features

* Use `lit-html` templates to build isomorphic web content
* Use the same view fragments in dynamic JS apps and static HTML sites
* Get simple access to `lit-up` state management
* Drop in ready-configured contexts for full client and server settings
* Quickly prepare development environments and build systems

## Quick Start

If you haven't built a `lit` app before, check out [`lit-html`](https://lit-html.polymer-project.org/) and [`lit-up`](https://github.com/klaudhaus/lit-up) first.

* View components

Ideally  we should be able to create template code that can be reused across interactive front-end apps, static site build systems, server-side rendered sites, headless unit tests etc.

In order to create context-agnostic view fragment modules, access all necessary `lit-html` associated functions, as well as the `up` event handler factory from `lit-up`, via the `lit-imp` module.

```js
// item-list-view.js
import { html, classMap, up } from "lit-imp"

function selectItem ({ items, item }) {
  items.forEach(i => i.selected = false)
  item.selected = true
}

export const itemListView = items => html`
  <ul>
    ${items.map(item => html`
      <li @click=${up(selectItem, { items, item })}
        class=${classMap({ selected: item.selected })}
        >
        ${item.label}
      </li>
    `)}
  </ul>`
```

Now you can quickly use this view fragment in either a dynamic interactive app or a statically rendered web page.

* Interative app in browser

```js
import { app } from "lit-imp/contexts/lit-html-client"
import { itemListView as view } from "./item-list-view"

const model = [{ label: "One "}, { label: "Two" }]

app({ model, view })
// Interactive app is up and running
```

* Static website page in Node

```js
import { renderToString } from "lit-imp/contexts/lit-html-server"
import { itemListView as view } from "./item-list-view"

const model = [{ label: "One "}, { label: "Two" }]

const html = renderToString(model(view))
// Now deploy the static HTML
```



## Contexts

In order to speed the preparation of development environments and build systems, two ready-made implementation contexts are delivered within this package and can be imported as follows:

```js
import { app } from "lit-imp/contexts/lit-html-client"

// or

import { renderToString, renderToStream, renderToBuffer } 
  from "lit-imp/contexts/lit-html-server"
```

`lit-html-client` sets up a context with all the functionality from `lit-html` such as the `html` literal tag and all the standard directives. As a convenience, it also exports a proxy to the `app` function from `lit-up` which automatically adds the appropriate render implementation along with a `boostrap` wrapper that shares the app's `up` function.

`lit-html-server` sets up a context based on the implementation from `@popeindustries/lit-html-server`, and conveniently exports the string, stream and buffer rendering methods from its underlying implementation.

> Note: Using these ready made contexts is convenient for app development and static site build systems, but more efficient production JavaScript bundles can be made for apps that do not use every standard directive by using `litImp()` directly to assign only the necessary imports.
>
> ROADMAP: `lit-imp-scan` to automatically prepare an efficient client or server context based on static analysis of provided view, model and bootstrap functions.


## Core API

### `litImp(functions)`

Sets up an implementation context to be consumed by modules such as view fragments. 

The `functions` object should include the `lit-html` (or equivalent) core functions (`html`, `svg`) and directives (`classMap`, `ifDefined`, `guard` etc.) that may be needed in the app. 

It can also include a reference to a `lit-up` app's `up` function (typically obtained as a parameter to the  `bootstrap` handler) which allows view fragments to access `up` via a simple import without coupling them to a specific app or needing to pass it through the entire view hierarchy.

> NOTE: This is only appropriate if you know that your `lit-up` app is bundled (by `rollup` or similar) separately from any code that may set up another `lit-up` app on the same page - i.e. you are only dealing with one `up` function. You can use the same view fragments safely across different apps on the same page with `lit-imp` so long as they're bundled separately.

If not specified, `up` defaults to a no-op function suitable for static rendering, while all `lit-html` related functions are undefined by default so that any that are used by fragment functions without having been provided will quickly show up as errors in development.

If there are multiple calls to `litImp`, references set up in earlier calls will only be overwritten by function keys that are specifically included in later calls, allowing a context to be set up incrementally. 

Here are some examples of calling `litImp` directly, instead of using ready-made contexts. They use the `itemListView` component shown above.
```js
import { html, render } from "lit-html"
import { classMap } from "lit-html/directives/classMap"
import { app } from "lit-up"
import { litImp } from "lit-imp"

import { itemListView as view } from "./item-list-view"

const model = [{ label: "One "}, { label: "Two" }]

const bootstrap = up => litImp({ html, classMap, up })

app({ model, view, render, bootstrap })
```

Or in a static website:

```js
import { html, renderToString } from "@popeindustries/lit-html-server"
import { classMap } from "@popeindustries/lit-html-server/directives/classMap"
import { litImp } from "lit-imp"

import { itemListView } from "./item-list-view"

const model = [{ label: "One "}, { label: "Two" }]

litImp({ html, classMap })
const html = await renderToString(itemListView(model))

// Now deploy the static html output
```

