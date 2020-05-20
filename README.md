# lit-app

> Build web apps the _light_ way

## Features

* [`lit-html`](https://lit-html.polymer-project.org/) templates - real HTML, real JS
* Develop with ES6 modules and no transpiling
* Simple access to powerful state management with [`lit-up`](https://github.com/klaudhaus/lit-up)
* Works with Web Components
* .. and without, using fragment functions
* Use the same view fragments in dynamic JS apps and static HTML sites
* Scales to large modular apps
* Environment-specific code branching
* Ready-made contexts with full client and server capabilities
* Quickly prepare development environments and build systems

## Quick Start

If you haven't built a `lit` app before, check out [`lit-html`](https://lit-html.polymer-project.org/) and [`lit-up`](https://github.com/klaudhaus/lit-up) first.

* Install

```bash
npm install lit-app
```

* View components

In order to create context-agnostic view fragment modules, access all necessary `lit-html` associated functions, as well as the `up` event handler factory from `lit-up`, via the `lit-app` module.

```js
// item-list-view.js
import { html, classMap, up } from "lit-app"

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
import { app } from "lit-app/contexts/lit-html-client"
import { itemListView as view } from "./item-list-view"

const model = [{ label: "One "}, { label: "Two" }]

app({ model, view })
// Interactive app is up and running
```

* Static website page in Node

```js
import { renderToString } from "lit-app/contexts/lit-html-server"
import { itemListView as view } from "./item-list-view"

const model = [{ label: "One "}, { label: "Two" }]

const html = renderToString(model(view))
// Now deploy the static HTML
```



## Contexts

In order to speed the preparation of development environments and build systems, two ready-made implementation contexts are delivered within this package and can be imported as follows:

```js
import { app } from "lit-app/contexts/lit-html-client"

// or

import { renderToString, renderToStream, renderToBuffer } 
  from "lit-app/contexts/lit-html-server"
```

`lit-html-client` sets up a context with all the functionality from `lit-html` such as the `html` literal tag and all the standard directives. As a convenience, it also exports a proxy to the `app` function from `lit-up` which automatically adds the appropriate render implementation along with a `bootstrap` wrapper that shares the app's `up` function. You can thus bootstrap a fully interactive application with one call, with the signature:

``app({ model, view, bootstrap, logger, element })``

For more details on the parameter keys and default values see [`lit-up`](https://github.com/klaudhaus/lit-up#appoptions).

`lit-html-client` provides a reference to the default browser API for `fetch`.

`lit-html-server` sets up a context based on the implementation from `@popeindustries/lit-html-server`, and conveniently exports the string, stream and buffer rendering methods from its underlying implementation.

`lit-html-server` provides a reference to `node-fetch` implentation.  

> Note: Using these ready made contexts is convenient for app development and static site build systems, but more efficient production JavaScript bundles can be made for apps that do not use every standard directive by using `appContext()` directly to assign only the necessary imports.
>
> ROADMAP: `lit-app-scan` to automatically prepare an efficient client or server context based on static analysis of provided view, model and bootstrap module imports.


## API

### `appContext( options )`

Sets up an implementation context to be consumed by modules such as view fragments.

If you use the ready-made contexts described above then all of this is set up for you and you have no need to call `appContext` directly.

The `options` object should include the `lit-html` (or equivalent) core functions (`html`, `svg`) and directives (`classMap`, `ifDefined`, `guard` etc.) that may be needed in the app. 

It can also include a reference to a `lit-up` app's `up` function (typically obtained as an argument to the  `bootstrap` handler) which allows view fragments to access `up` via a simple import without coupling them to a specific app or needing to pass it through the entire view hierarchy. 

It can also include an `env` object whose keys will be available to view fragments for conditional branching based on environment variables.

It can also specify a `fetch` implementation. This can be useful in functions related to `lit-up` state.

If not specified, `up` defaults to a no-op function suitable for static rendering, while all `lit-html` related functions are undefined by default so that any that are used by fragment functions without having been provided will quickly show up as errors in development.

If there are multiple calls to `appContext`, references set up in earlier calls will only be overwritten by function keys that are specifically included in later calls, allowing a context to be set up incrementally. 

Here are some examples of calling `appContext` directly, instead of using ready-made contexts. They use the `itemListView` component shown above.
```js
import { html, render } from "lit-html"
import { classMap } from "lit-html/directives/classMap"
import { app } from "lit-up"
import { appContext } from "lit-app"

import { itemListView as view } from "./item-list-view"

const model = [{ label: "One "}, { label: "Two" }]

const bootstrap = ({ up }) => appContext({ html, classMap, up })

app({ model, view, render, bootstrap })
```

Or in a static website:

```js
import { html, renderToString } from "@popeindustries/lit-html-server"
import { classMap } from "@popeindustries/lit-html-server/directives/classMap"
import { appContext } from "lit-app"

import { itemListView } from "./item-list-view"

const model = [{ label: "One "}, { label: "Two" }]

appContext({ html, classMap })
const html = await renderToString(itemListView(model))

// Now deploy the static html output
```



### ```html, svg, asyncAppend, asyncReplace, cache, classMap, ifDefined, guard, live, repeat, styleMap, templateContent, unsafeHTML, unsafeSVG, until```

Once the application context is initialised, all the `lit-html` related functions and directives (from whichever underlying implementation) are proxied via `lit-app`, enabling fully isomorphic view fragments.

### `up(update, data)`

The `up` event handler factory from `lit-up` is also proxied via `lit-app`, allowing easy access to the application-specific `up` function for your view fragments.

See [`lit-up`](https:github.com/klaudhaus/lit-up) for more details on how to use this powerful yet concise state management system.

NOTE: This is only appropriate if you know that this `lit-app` is bundled (by `rollup` or similar) separately from any code that may set up another `lit-up` app on the same page - i.e. you are only dealing with one `up` function.

### `env`

The `env` reference can be imported from lit-app, providing a container for environment variables that can be used to deliver different behavior, for example different logging in development and production.

```js
import { app, env } from "lit-app"

const logger = env.isProd
	? false
	: ({ name, time, data } => console.log(`${name} ${time} ${data}`))

app({model, view, logge})
```

You could also use a dynamic import expression to enable inclusion of whole code modules based on environment, enabling unnecessary development code to be excluded from production builds.

### `fetch`

This key is intended to proxy the platform-specific `fetch` function, which is very useful in `lit-up` state management functions such as `bootstrap`.

The default contexts set up proxies to platform-appropriate fetch implementations.

## Application Structure

### Using Web Components

You can use any standards-compliant Web Component in interactive `lit-app` applications. However, bear in mind that web components generally rely on browser APIs to work, so they can't be used in content that may be rendered as static HTML. 

To use a Web Component, install it in your app as per its own documentation and then use the appropriate tag name and set its attributes, properties and event handlers (using `up`) accordingly.

```js
import { WiredButton, WiredInput } from "wired-elements"

const view = ({ model, up }) => html` 
  <wired-input placeholder="Name"
    @change=${up(setName)}></wired-input>
  <wired-button
    @click=${up(greet, model.name)}>
      Greet ${model.name}</wired-button>`
```

If you identify a generic component that is commonly reused across different interactive applications, and possibly other front-end frameworks, it is a good candidate to be implemented as a Web Component using a library such as `lit-element` or `haunted`.

If you wish to split up your application view into smaller components for the purpose of clarity and organisation, rather than for reuse across different frameworks and organisations, building them as Web Components may be overkill. Also, Web Components may not be the best choice for SVG applications as there are some compatibility problems with the SVG namespace.

### Using Fragment Functions

Ideally  we should be able to create template code that can be reused across interactive front-end apps, static site build systems, server-side rendered sites, headless unit tests etc.

When rendered statically, the component should display its given state. When used interactively, the view should have seamless access to link user events to application state management.

Fragment functions implement a component, or fragment of the view, as a single function (which may itself call other fragment functions). They can accept data properties, event handlers and inner content.

Implementing your view components as Fragment Functions with dependencies resolved via `lit-app` makes them "isomorphic" - they can be used in both interactive front-end apps as well as static pages.

```js
// content-button.js

import { html } from "lit-app"

const contentButton = ({ label, content, click }) => html`
  <button @click=${click}>
    ${label}
    ${content}
  </button>`
```

```js

import { html, up } from "lit-app"

import { contentButton } from "./content-button.js"

const view = ({ showUserProfile, showNews }) => html`
  <div class="part-of-the-view">
    ${contentButton({ 
      label: "User",
      content: html`<i class="user-icon" />`
      click: up(showUserProfile)
    })}
    ${contentButton({
      label: "News",
      content: html`<img src="news.png" />`
      click: up(showNews)
    })}
  </div>`
```
