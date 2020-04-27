/**
 * Specify implementations of lit-html associated functions.
 *
 * This allows for implementation-agnostic view modules,
 * such as components that may be used with `lit-html` or `lit-html-server`.
 *
 * Also enables central registration of the `up` function from `lit-up`,
 * as an alternative pattern for accessing `up` instead of passing through views,
 * whilst maintaining component reusability across apps.
 * For situations where you know that your app and its dependencies will be
 * bundled separately from any other `lit-up` apps that may be on the same page.
 *
 * @param _html { Function }
 * @param _svg { Function }
 * @param _unsafeHTML { Function }
 * @param _unsafeSVG { Function }
 * @param _asyncAppend { Function }
 * @param _asyncReplace { Function }
 * @param _cache { Function }
 * @param _classMap { Function }
 * @param _ifDefined { Function }
 * @param _guard { Function }
 * @param _live { Function }
 * @param _repeat { Function }
 * @param _styleMap { Function }
 * @param _templateContent { Function }
 * @param _until { Function }
 * @param _up { Function }
 */
export const litImp = ({
  html: _html,
  svg: _svg,
  asyncAppend: _asyncAppend,
  asyncReplace: _asyncReplace,
  cache: _cache,
  classMap: _classMap,
  ifDefined: _ifDefined,
  guard: _guard,
  live: _live,
  repeat: _repeat,
  styleMap: _styleMap,
  templateContent: _templateContent,
  unsafeHTML: _unsafeHTML,
  unsafeSVG: _unsafeSVG,
  until: _until,
  up: _up
}) => {
  html = _html || html
  svg = _svg || svg
  asyncAppend = _asyncAppend || asyncAppend
  asyncReplace = _asyncReplace || asyncReplace
  cache = _cache || cache
  classMap = _classMap || classMap
  ifDefined = _ifDefined || ifDefined
  guard = _guard || guard
  live = _live || live
  repeat = _repeat || repeat
  styleMap = _styleMap || styleMap
  templateContent = _templateContent || templateContent
  unsafeHTML = _unsafeHTML || unsafeHTML
  unsafeSVG = _unsafeSVG || unsafeSVG
  until = _until || until
  up = _up || up
}

export let html

export let svg

export let asyncAppend

export let asyncReplace

export let cache

export let classMap

export let ifDefined

export let guard

export let live

export let repeat

export let styleMap

export let templateContent

export let unsafeHTML

export let unsafeSVG

export let until

export let up = () => {}
