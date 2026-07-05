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
  apiKey: "TODO_ВСТАВИТЬ_API_KEY",
  authDomain: "test-job-54xb1d.firebaseapp.com",
  projectId: "test-job-54xb1d",
  appId: "TODO_ВСТАВИТЬ_APP_ID",
};

export async function submitLead(lead: { name: string; contact: string }) {
  if (firebaseConfig.apiKey.startsWith("TODO")) {
    throw new Error("firebase-not-configured");
  }
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);
  await addDoc(collection(db, "leads"), {
    name: lead.name,
    contact: lead.contact,
    createdAt: serverTimestamp(),
    source: "viktorpanteleev.ru",
  });
}
