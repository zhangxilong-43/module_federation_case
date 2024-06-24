import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import microApp from '@micro-zoe/micro-app'

const root = document.querySelector('#root')
root && createRoot(root).render(
    <HashRouter>
        <App />
    </HashRouter>
)

microApp.start()