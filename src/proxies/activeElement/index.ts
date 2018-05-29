/**
 * Checks to see if the document has an active element or not.
 * If the active element is an exposed shadow root,
 * then we check one of two scenarios.
 *
 * 1. If the active root has no active element, then the active element is
 * actually the element the document is pointing at.
 *
 * 2. If the active root has an active element, then that is our real
 * active element.
 *
 * @param  {DocumentOrShadowRoot[]} exposed
 * @returns Element | null
 */

export default function activeElement(
  exposed: DocumentOrShadowRoot[]
): Element | null {
  const activeRoot = exposed.find(
    root => root === document.activeElement.shadowRoot
  );

  if (!activeRoot || !activeRoot.activeElement) {
    return document.activeElement;
  }

  return activeRoot.activeElement;
}
