import { db, storage } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';

const COLLECTION_NAME = 'wallpapers';

// Fetch all wallpapers
export async function getWallpapers() {
  const q = query(collection(db, COLLECTION_NAME), orderBy('id', 'desc'));
  const querySnapshot = await getDocs(q);
  const wallpapers = [];
  querySnapshot.forEach((doc) => {
    wallpapers.push({ docId: doc.id, ...doc.data() });
  });
  return wallpapers;
}

// Upload image and return the download URL
export function uploadImage(file, onProgress, onError, onSuccess) {
  // Create a unique filename
  const uniqueName = `${Date.now()}-${file.name}`;
  const storageRef = ref(storage, `wallpapers/${uniqueName}`);
  
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (onProgress) onProgress(progress);
    },
    (error) => {
      if (onError) onError(error);
    },
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      if (onSuccess) onSuccess(downloadURL, uniqueName);
    }
  );
}

// Add wallpaper to Firestore
export async function addWallpaper(wallpaperData) {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), wallpaperData);
  return docRef.id;
}

// Update wallpaper in Firestore
export async function updateWallpaper(docId, wallpaperData) {
  const docRef = doc(db, COLLECTION_NAME, docId);
  await updateDoc(docRef, wallpaperData);
}

// Delete wallpaper
export async function deleteWallpaper(docId, fileName) {
  // Delete from Firestore
  const docRef = doc(db, COLLECTION_NAME, docId);
  await deleteDoc(docRef);

  // Delete from Storage
  if (fileName) {
    const storageRef = ref(storage, `wallpapers/${fileName}`);
    try {
      await deleteObject(storageRef);
    } catch (error) {
      console.error("Error deleting image from storage:", error);
      // Proceed even if storage deletion fails (e.g., file might not exist)
    }
  }
}
