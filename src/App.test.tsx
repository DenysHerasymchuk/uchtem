import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the Uchtem wordmark in the header on the home route', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </HelmetProvider>,
    );

    // Home's lazy-loaded chunk pulls in gsap, i18next, and every homepage
    // section, so resolving it can occasionally exceed testing-library's
    // default 1000ms wait — give it more room rather than flaking.
    expect(await screen.findAllByAltText('Uchtem', {}, { timeout: 5000 })).not.toHaveLength(0);
  });
});
