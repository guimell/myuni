import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, collection, doc, getFirestore } from "firebase/firestore";

class FirebaseConfig {
  static Config = {
    apiKey: "AIzaSyBfRbpbg-A6izQhPVR7Lzp52ktSsoKoATM",
    authDomain: "myuni-4d4ea.firebaseapp.com",
    projectId: "myuni-4d4ea",
    storageBucket: "myuni-4d4ea.appspot.com",
    messagingSenderId: "661291525293",
    appId: "1:661291525293:web:07aeb1a16897d3c23d5224",
    measurementId: "G-VGXQHLSLXH",
  };

  // Initialize Firebase
  static app: FirebaseApp;
  // Initialize Cloud Firestore and get a reference to the service
  static db: Firestore;
  static init() {
    FirebaseConfig.app = initializeApp(FirebaseConfig.Config);
    FirebaseConfig.db = getFirestore(FirebaseConfig.app);
  }
}
export function _collection(collectionName: string) {
  if (!FirebaseConfig.db) {
    FirebaseConfig.init();
  }
  return collection(FirebaseConfig.db, collectionName);
}

export function _doc(collectionName: string, docName: string) {
  return doc(_collection(collectionName), docName);
}
export default FirebaseConfig;
