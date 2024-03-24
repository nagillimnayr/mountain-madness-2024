import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import store from '@/state/store';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export const Providers = ({children}: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      {children}
      </QueryClientProvider>
    </Provider>
  )
}
