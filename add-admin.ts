import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import * as fs from 'fs';

async function run() {
  const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
  const app = initializeApp(config);
  const db = getFirestore(app);

  try {
    const emailRef = doc(db, 'admins', 'defentechscholar@gmail.com');
    await setDoc(emailRef, {
      email: 'defentechscholar@gmail.com',
      role: 'admin',
      created_at: new Date().toISOString()
    });
    console.log("Admin record successfully created/updated in Firestore.");
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin record:", err);
    process.exit(1);
  }
}

run();
