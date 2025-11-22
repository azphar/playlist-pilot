import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkl15UFV9fBjAYltZQ4B0HilrbtWm7akA",
  authDomain: "playlist-pilot-191fd.firebaseapp.com",
  projectId: "playlist-pilot-191fd",
  storageBucket: "playlist-pilot-191fd.firebasestorage.app",
  messagingSenderId: "230398917142",
  appId: "1:230398917142:web:3c4734c1e7ce665f849337",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function savePlaylistToFirestore(name, videos) {
  if (!name || !videos || !videos.length) {
    throw new Error("Playlist name and at least one video are required.");
  }

  const docRef = await addDoc(collection(db, "playlists"), {
    name,
    videos,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

