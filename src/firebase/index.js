import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { firebaseConfig } from './config';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestoreDb = firebaseApp.firestore();
export const db = firestoreDb;
const firebaseStorage = firebaseApp.storage();
export const storage = firebaseStorage;
export const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();