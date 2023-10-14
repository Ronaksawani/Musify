import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import Auth from './Components/Central_store/Auth';
import { SongProvider } from './Components/Central_store/Contex';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <SongProvider>
         <Auth/>
         <App/>
            </SongProvider>
);

