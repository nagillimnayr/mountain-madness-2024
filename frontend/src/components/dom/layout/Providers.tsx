import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import store from '@/state/store';

export const Providers = ({children}: PropsWithChildren) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
