export {
  TemplateResult,
  SVGTemplateResult,
  html,
  svg
} from "lit-html"

import { Up } from "lit-up"

export { Update, UpdateResult, View, ViewResult } from "lit-up"

export { asyncAppend } from "lit-html/directives/async-append"
export { asyncReplace } from "lit-html/directives/async-replace"
export { cache } from "lit-html/directives/cache"
export { classMap } from "lit-html/directives/class-map"
export { ifDefined } from "lit-html/directives/if-defined"
export { guard } from "lit-html/directives/guard"
export { live } from "lit-html/directives/live"
export { repeat } from "lit-html/directives/repeat"
export { styleMap } from "lit-html/directives/style-map"
export { templateContent } from "lit-html/directives/template-content"
export { unsafeHTML } from "lit-html/directives/unsafe-html"
export { unsafeSVG } from "lit-html/directives/unsafe-svg"
export { until } from "lit-html/directives/until"

export const up: Up<any>

export function fetch (input: RequestInfo, init?: RequestInit) : Promise<Response>
