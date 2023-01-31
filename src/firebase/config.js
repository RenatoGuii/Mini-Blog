
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore" //Chamando o BD

const firebaseConfig = {
  apiKey: "AIzaSyBysiA5Fzt_qWbuy1pbQeseA_aAYUECfyg",
  authDomain: "mini-blog-ca8e2.firebaseapp.com",
  projectId: "mini-blog-ca8e2",
  storageBucket: "mini-blog-ca8e2.appspot.com",
  messagingSenderId: "983594416762",
  appId: "1:983594416762:web:e7a9ac7a667d05781d99c3"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }