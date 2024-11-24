import { firebase } from '@nativescript/firebase-core';

export function initializeFirebase() {
  firebase().initializeApp({}).then(() => {
    console.log('Firebase initialized successfully');
  }).catch(error => {
    console.error('Firebase initialization error:', error);
  });
}