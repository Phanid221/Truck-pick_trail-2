import { Application } from '@nativescript/core';
import { initializeFirebase } from './services/firebase.service';

// Register all pages for navigation
const pages = {
    'pages/auth/login-page': () => require('./pages/auth/login-page'),
    'pages/user/user-dashboard': () => require('./pages/user/user-dashboard'),
    'pages/broker/broker-dashboard': () => require('./pages/broker/broker-dashboard')
};

Object.keys(pages).forEach(path => {
    global.registerModule(path, pages[path]);
});

// Initialize Firebase before starting the app
initializeFirebase();

Application.run({ moduleName: 'app-root' });