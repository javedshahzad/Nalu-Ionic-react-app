// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

// Mock matchMedia
window.matchMedia = window.matchMedia || function (query: string): MediaQueryList {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: function () {}, // Deprecated, use addEventListener instead
    removeListener: function () {}, // Deprecated, use removeEventListener instead
    addEventListener: function () {},
    removeEventListener: function () {},
    dispatchEvent: function (): boolean { return false; },
  };
};

