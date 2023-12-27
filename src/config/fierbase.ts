import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {
  apiKey,
  appId,
  authDomain,
  messaingSenderId,
  projectID,
  storageBucket,
} from "../constants/";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectID,
  storageBucket: storageBucket,
  messagingSenderId: messaingSenderId,
  appId: appId,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
