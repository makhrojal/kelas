import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { StorageService } from './services/storage';
import { AuthProvider } from './hooks/useAuth';

// Initialize local storage with mock data
StorageService.init();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <AuthProvider>
    <App />
              </AuthProvider>
  </StrictMode>,
);

