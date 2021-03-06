import { html, svg } from "@popeindustries/lit-html-server"

import { asyncAppend } from "@popeindustries/lit-html-server/directives/async-append"
import { asyncReplace } from "@popeindustries/lit-html-server/directives/async-replace"
import { cache } from "@popeindustries/lit-html-server/directives/cache"
import { classMap } from "@popeindustries/lit-html-server/directives/class-map"
import { ifDefined } from "@popeindustries/lit-html-server/directives/if-defined"
import { guard } from "@popeindustries/lit-html-server/directives/guard"
import { repeat } from "@popeindustries/lit-html-server/directives/repeat"
import { styleMap } from "@popeindustries/lit-html-server/directives/style-map"
import { unsafeHTML } from "@popeindustries/lit-html-server/directives/unsafe-html"
import { until } from "@popeindustries/lit-html-server/directives/until"

import fetch from "node-fetch"

import { appContext } from "../lit-app"

export { renderToString, renderToStream, renderToBuffer } from "@popeindustries/lit-html-server"

appContext({
  html, svg,
  asyncAppend, asyncReplace, cache, classMap, ifDefined,
  fetch,
  guard, repeat, styleMap, unsafeHTML, until,
  // Stub substitutes for missing directives
  live: x => x,
  templateContent: x => x,
  unsafeSVG: unsafeHTML,
})
