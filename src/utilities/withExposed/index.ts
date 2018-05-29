/**
 * General function that will decorate all of our proxies
 * to declaratively have access to the exposed shadow root array.
 *
 * Not really sure how to write jsdoc comments for a curried function.
 */

export default (fn: Function): Function => (
  exposed: DocumentOrShadowRoot[]
): Function => (...args: any[]) => fn(exposed, ...args);
