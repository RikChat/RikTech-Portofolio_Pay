import { initializeApp } from "firebase/app";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbRef, push, child, get, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCv9WFA4kxLzNFJCcI9HeH1VYscCirsGjM",
  authDomain: "rikchatapps-fb56e.firebaseapp.com",
  databaseURL: "https://rikchatapps-fb56e-default-rtdb.firebaseio.com",
  projectId: "rikchatapps-fb56e",
  storageBucket: "rikchatapps-fb56e.firebasestorage.app",
  messagingSenderId: "1033951094916",
  appId: "1:1033951094916:web:5c38d8901c02fa03c63ad1",
  measurementId: "G-ZGXCG5337B"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getDatabase(app);

// upload file to firebase storage and return download URL and metadata push
export async function uploadProjectFile(folder, file, metadata = {}) {
  const ref = storageRef(storage, `${folder}/${Date.now()}_${file.name}`);
  await uploadBytes(ref, file);
  const url = await getDownloadURL(ref);
  // push metadata to realtime DB
  try {
    const metaRef = dbRef(database, 'projects');
    await push(metaRef, { name: file.name, url, createdAt: Date.now(), ...metadata });
  } catch(e){}
  return url;
}

// verify VIP code against realtime DB path 'vip_codes/{code}' which should be truthy or object
export async function verifyVipCode(code) {
  if(!code) return false;
  const db = database;
  const codeRef = child(dbRef(db), `vip_codes/${code}`);
  try {
    const snap = await get(codeRef);
    return snap.exists();
  } catch(e){
    console.error('verifyVipCode', e);
    return false;
  }
}

// helper to create a vip code (for admin/server) - client can call after payment to register code
export async function createVipCode(code, data={}) {
  const db = database;
  const codeRef = dbRef(db, `vip_codes/${code}`);
  await set(codeRef, { createdAt: Date.now(), ...data });
  return true;
}
