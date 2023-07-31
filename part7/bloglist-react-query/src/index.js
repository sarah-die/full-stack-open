import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import './index.css';
import App from './App';
import { NotificationContextProvider } from './NotificationContext';
import { BrowserRouter as Router } from 'react-router-dom';

// pass react query functions to the entire application
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <Router>
        <App />
      </Router>
    </NotificationContextProvider>
  </QueryClientProvider>,
);
