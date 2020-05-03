import { html, svg, render } from "lit-html"

import { asyncAppend } from "lit-html/directives/async-append"
import { asyncReplace } from "lit-html/directives/async-replace"
import { cache } from "lit-html/directives/cache"
import { classMap } from "lit-html/directives/class-map"
import { ifDefined } from "lit-html/directives/if-defined"
import { guard } from "lit-html/directives/guard"
import { live } from "lit-html/directives/live"
import { repeat } from "lit-html/directives/repeat"
import { styleMap } from "lit-html/directives/style-map"
import { unsafeHTML } from "lit-html/directives/unsafe-html"
import { unsafeSVG } from "lit-html/directives/unsafe-svg"
import { templateContent } from "lit-html/directives/template-content"
import { until } from "lit-html/directives/until"

import { app as litUpApp } from "lit-up"

import { appContext } from "../lit-app"

appContext({
  html, svg, unsafeHTML, unsafeSVG,
  asyncAppend, asyncReplace, cache, classMap, ifDefined,
  guard, live, repeat, styleMap, templateContent, until
})

export const app = ({ model, view, element, boostrap, logger }) => {
  const wrappedBoostrap = up => {
    appContext({ up })
    if (typeof boostrap === "function") return boostrap(up)
  }

  litUpApp({ model, view, element, bootstrap: wrappedBoostrap, logger, render })
}
