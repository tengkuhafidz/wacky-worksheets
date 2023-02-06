import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { FIREBASE_CONFIG } from '$env/static/private'
import { getFirestore } from "firebase/firestore";




const firebaseConfig = JSON.parse(FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export const storage = getStorage(app);
export const db = getFirestore(app)