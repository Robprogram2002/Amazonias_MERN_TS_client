import { FC } from 'react';
import { render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from 'react-query';
import AuthProvider from '../context/AuthContext';

const queryClient = new QueryClient();

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers: FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>{children}</AuthProvider>
  </QueryClientProvider>
);

const customRender = (ui: any, options = {}) =>
  render(ui, { ...options, wrapper: Providers });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
