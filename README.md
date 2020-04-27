# lit-imp

> Build implementation-agnostic `lit` apps and sites

### Features

* Use the same view fragments in dynamic JS apps and static sites

* Seamless access to `lit-up` state management

### Quick Start

If you haven't built a `lit` app before, check out [`lit-html`](https://lit-html.polymer-project.org/) and [`lit-up`](https://github.com/klaudhaus/lit-up) first.

In your view fragment modules, access all necessary `lit-html` associated functions, as well as the `up` event handler factory from `lit-up`, via the `lit-imp` module.

```js
import { html, classMap, up } from "lit-imp"

function selectItem ({ items, item }) {
  items.forEach(i => i.selected = false)
  item.selected = true
}

export const itemListView = items => html`
	<ul>
		${items.map(item => html`
			<li @click=${up(selectItem)}
				class=${classMap({ selected: item.selected })}
    		>
				${item.label}
			</li>
		`)}
	</ul>`
  
```

Now, you can use the same view fragment in a dynamic app, with event handling:

```js
import { html, render } from "lit-html"
import { classMap } from "lit-html/directives/classMap"
import { app } from "lit-up"
import { litImp } from "lit-imp"

import { model } from "./model"
import { itemListView } from "./item-list-view"

const bootstrap (up) => litImp({ html, classMap, up })
const view = ({ model }) => itemListView( model.items )

app({ model, view, render, bootstrap })
```

Or in a static website:

```js
import { html, renderToString } from "@popeindustries/lit-html-server"
import { classMap } from "@popeindustries/lit-html-server/directives/classMap"
import { litImp } from "lit-imp"

import { model } from "./model"
import { itemListView } from "./item-list-view"

litImp({ html, classMap })
const html = await renderToString(itemListView(model.items))

// Now deploy the static html output
```

Other usages could include unit tests, server-side rendered sites etc.



## API

### `litImp(functions)`

Sets up an implementation context to be consumed by modules such as view fragements. 

The `functions` object should include any `lit-html` (or equivalent) core functions (`html`, `svg`, `unsafeHTML` and/or `unsafeSVG`) and directives (`classMap`, `ifDefined`, `guard` etc.) that may be needed in the app. 

It can also include a reference to a `lit-up` app's `up` function (typically obtained as a parameter to the  `bootstrap` handler) which allows view fragments to access `up` via a simple import without coupling them to a specific app or needing to pass it through the entire view hierarchy.

> NOTE: This is only appropriate if you know that your `lit-up` app is bundled (by `rollup` or similar) separately from any code that may set up another `lit-up` app on the same page - i.e. you are only dealing with one `up` function. You can use the same view fragments safely across different apps on the same page with `lit-imp` so long as they're bundled separately.

If not specified, `up` defaults to a no-op function suitable for static rendering, while all `lit-html` related functions are undefined by default so that any that are used by fragment functions without having been provided will quickly show up as errors in development.

If there are multiple calls to `litImp`, references set up in earlier calls will only be overwritten by function keys that are specifically included in later calls, allowing a context to be set up incrementally. 

