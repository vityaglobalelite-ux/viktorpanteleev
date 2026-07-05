import { getApp, getApps, initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

// Конфиг веб-приложения Firebase. Это НЕ секрет: он в любом случае виден в
// браузере, безопасность обеспечивают правила Firestore (create-only в leads).
// Где взять: console.firebase.google.com → проект test-job-54xb1d →
// ⚙ Project settings → General → Your apps → добавить Web app (</>) →
// скопировать значения из firebaseConfig сюда.
const firebaseConfig = {
  apiKey: "AIzaSyByASC0LR_0vQo8-6MMvpVk184vC39MOx0",
  authDomain: "test-job-54xb1d.firebaseapp.com",
  projectId: "test-job-54xb1d",
  appId: "1:605333513125:web:9d31a4e4114f7c0f0a7e4c",
};

export async function submitLead(lead: { name: string; contact: string }) {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);
  await addDoc(collection(db, "leads"), {
    name: lead.name,
    contact: lead.contact,
    createdAt: serverTimestamp(),
    source: "viktorpanteleev.ru",
  });
}
