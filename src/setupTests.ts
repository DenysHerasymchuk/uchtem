// jest-dom adds custom matchers for asserting on DOM nodes.
import '@testing-library/jest-dom/vitest';
import './i18n';

// jsdom has no IntersectionObserver; Framer Motion's useInView (used by
// scroll-reveal components across the site) needs at least a stub.
class MockIntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly scrollMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve() {}
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver as unknown as typeof IntersectionObserver);

// jsdom has no ResizeObserver; CursorWave uses it to re-measure its grid.
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

vi.stubGlobal('ResizeObserver', MockResizeObserver as unknown as typeof ResizeObserver);

// jsdom doesn't implement scrollTo; Layout calls it on route change.
window.scrollTo = vi.fn() as typeof window.scrollTo;

// jsdom has no matchMedia; CursorWave uses it to respect prefers-reduced-motion.
window.matchMedia = vi.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
})) as unknown as typeof window.matchMedia;
