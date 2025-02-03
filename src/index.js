import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './app/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
  <>
    <QueryClientProvider client={queryClient}>

      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>

  </>
);

