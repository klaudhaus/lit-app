import { html, svg, unsafeHTML, unsafeSVG, render } from "@popeindustries/lit-html-server"

import { asyncAppend } from "@popeindustries/lit-html-server/directives/async-append"
import { asyncReplace } from "@popeindustries/lit-html-server/directives/async-replace"
import { cache } from "@popeindustries/lit-html-server/directives/cache"
import { classMap } from "@popeindustries/lit-html-server/directives/class-map"
import { ifDefined } from "@popeindustries/lit-html-server/directives/if-defined"
import { guard } from "@popeindustries/lit-html-server/directives/guard"
import { repeat } from "@popeindustries/lit-html-server/directives/repeat"
import { styleMap } from "@popeindustries/lit-html-server/directives/style-map"
import { until } from "@popeindustries/lit-html-server/directives/until"

import { app as litUpApp } from "lit-up"

import { litImp } from "../lit-imp"

litImp({
  html, svg, unsafeHTML, unsafeSVG,
  asyncAppend, asyncReplace, cache, classMap, ifDefined,
  guard, repeat, styleMap, templateContent, until
})

export const app = ({ model, view, element, boostrap, logger }) => {
  const wrappedBoostrap = up => {
    litImp({ up })
    if (typeof boostrap === "function") return boostrap(up)
  }

  litUpApp({ model, view, element, bootstrap: wrappedBoostrap, logger, render })
}
