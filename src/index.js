import invariant from 'invariant';
import proxies from 'proxies';

// Mutable List of all the shadow roots
// We should be paying attention to.
const exposed = [];
const shadom = {};

invariant(
  typeof ShadowRoot !== 'undefined',
  'ShadowDOM is not available in this environment',
);

invariant(
  typeof window !== 'undefined' && typeof document !== 'undefined',
  'Window and Document are not available in this environment',
);

/**
 * We are going to find the intersection between the functions that
 * the current document, and the implemented shadow root share.
 */
const shared = new Set(
  ...Object.keys(document),
  ...Object.keys(ShadowRoot.prototype),
);

shared.forEach((key) => {
  const proxy = proxies[key];

  /**
   * We have yet to write a proxy for this property.
   * So we just let the Document handle it.
   */
  if (!proxy) {
    return;
  }

  shadom[key] = proxies[key](exposed);
});

export function expose(root) {
  root.__SHADOM_EXPOSED__ = true;
  exposed.push(root);
}

export default shadom;
