import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDRrmi4lInZK_a0rYgL6jr48k6-iieAPII',
  authDomain: 'sanatan-strokes.firebaseapp.com',
  projectId: 'sanatan-strokes',
  storageBucket: 'sanatan-strokes.firebasestorage.app',
  messagingSenderId: '349325980477',
  appId: '1:349325980477:web:224b0a5fd4f582ede94b54'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app