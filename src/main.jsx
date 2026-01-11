import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { Provider } from 'react-redux';
import { store, persistor } from './store/store.js';
import { PersistGate } from "redux-persist/integration/react";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TonConnectUIProvider manifestUrl="http://localhost:5173/tonconnect-manifest.json">
          <App />
        </TonConnectUIProvider>
      </PersistGate>
    </Provider>

);
