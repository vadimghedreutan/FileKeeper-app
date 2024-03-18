import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDyPrNTx5Sd2GDesTW46_W-YOuph-vATTQ",
    authDomain: "cloud-project-d7e69.firebaseapp.com",
    projectId: "cloud-project-d7e69",
    storageBucket: "cloud-project-d7e69.appspot.com",
    messagingSenderId: "756022430990",
    appId: "1:756022430990:web:8153329685d058b48b1b5f"
  };

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const storage = getStorage(app);

    export { db, storage };