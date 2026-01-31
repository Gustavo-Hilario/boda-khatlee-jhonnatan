import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from '../config/firebase'
import type { Guest } from '../types'

const GUESTS_COLLECTION = 'guests'

/**
 * Convert Firestore document to Guest type
 */
function docToGuest(id: string, data: Record<string, unknown>): Guest {
  return {
    id,
    name: data.name as string,
    passes: data.passes as number,
    confirmed: data.confirmed as number | undefined,
  }
}

/**
 * Load all guests from Firestore
 */
export async function loadGuestsFromFirestore(): Promise<Guest[]> {
  const querySnapshot = await getDocs(collection(db, GUESTS_COLLECTION))
  return querySnapshot.docs.map((doc) => docToGuest(doc.id, doc.data()))
}

/**
 * Load a single guest by ID from Firestore
 */
export async function loadGuestById(guestId: string): Promise<Guest | null> {
  const docRef = doc(db, GUESTS_COLLECTION, guestId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docToGuest(docSnap.id, docSnap.data())
  }
  return null
}

/**
 * Add a new guest to Firestore
 */
export async function addGuestToFirestore(guest: Guest): Promise<void> {
  const docRef = doc(db, GUESTS_COLLECTION, guest.id)
  await setDoc(docRef, {
    name: guest.name,
    passes: guest.passes,
    confirmed: guest.confirmed ?? null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

/**
 * Update an existing guest in Firestore
 */
export async function updateGuestInFirestore(
  guestId: string,
  data: Partial<Pick<Guest, 'name' | 'passes' | 'confirmed'>>
): Promise<void> {
  const docRef = doc(db, GUESTS_COLLECTION, guestId)
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

/**
 * Delete a guest from Firestore
 */
export async function deleteGuestFromFirestore(guestId: string): Promise<void> {
  const docRef = doc(db, GUESTS_COLLECTION, guestId)
  await deleteDoc(docRef)
}

/**
 * Clear guest confirmation (remove the confirmed field)
 */
export async function clearGuestConfirmation(guestId: string): Promise<void> {
  const docRef = doc(db, GUESTS_COLLECTION, guestId)
  await updateDoc(docRef, {
    confirmed: deleteField(),
    updatedAt: serverTimestamp(),
  })
}

/**
 * Subscribe to real-time guest updates
 * Returns an unsubscribe function
 */
export function subscribeToGuests(
  onUpdate: (guests: Guest[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  return onSnapshot(
    collection(db, GUESTS_COLLECTION),
    (snapshot) => {
      const guests = snapshot.docs.map((doc) => docToGuest(doc.id, doc.data()))
      onUpdate(guests)
    },
    (error) => {
      console.error('Error subscribing to guests:', error)
      onError?.(error)
    }
  )
}

/**
 * Batch import guests to Firestore (for migration)
 */
export async function importGuestsToFirestore(guests: Guest[]): Promise<void> {
  const promises = guests.map((guest) => addGuestToFirestore(guest))
  await Promise.all(promises)
}
