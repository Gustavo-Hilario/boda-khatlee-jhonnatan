/**
 * Migration script to import guests from lista-boda.json to Firebase Firestore
 *
 * Usage:
 *   npx tsx scripts/migrate-to-firebase.ts
 *
 * Make sure you have:
 * 1. Set up your .env.local with Firebase credentials
 * 2. Enabled Firestore in your Firebase project
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, setDoc, getDocs, serverTimestamp } from 'firebase/firestore'
import { readFileSync } from 'fs'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

// Read guest data from JSON file
const guestData = JSON.parse(readFileSync('./src/lista-boda.json', 'utf-8'))

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
}

interface Guest {
  id: string
  name: string
  passes: number
  confirmed?: number
}

async function migrate() {
  console.log('Starting migration to Firebase Firestore...\n')

  // Validate config
  if (!firebaseConfig.projectId) {
    console.error('Error: Firebase configuration not found.')
    console.error('Make sure .env.local exists with your Firebase credentials.')
    process.exit(1)
  }

  console.log(`Project ID: ${firebaseConfig.projectId}`)

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  // Check existing guests
  const guestsRef = collection(db, 'guests')
  const existingDocs = await getDocs(guestsRef)
  const existingCount = existingDocs.size

  if (existingCount > 0) {
    console.log(`\nWarning: Found ${existingCount} existing guests in Firestore.`)
    console.log('This migration will add guests that don\'t already exist.')
    console.log('Existing guests will be skipped.\n')
  }

  // Get existing IDs
  const existingIds = new Set(existingDocs.docs.map(doc => doc.id))

  // Import guests
  let imported = 0
  let skipped = 0

  for (const guest of guestData as Guest[]) {
    if (existingIds.has(guest.id)) {
      console.log(`  Skipping "${guest.name}" (already exists)`)
      skipped++
      continue
    }

    try {
      const docRef = doc(db, 'guests', guest.id)
      await setDoc(docRef, {
        name: guest.name,
        passes: guest.passes,
        confirmed: guest.confirmed ?? null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      console.log(`  Imported: ${guest.name} (${guest.passes} passes)`)
      imported++
    } catch (error) {
      console.error(`  Error importing ${guest.name}:`, error)
    }
  }

  console.log('\n--- Migration Summary ---')
  console.log(`Total guests in JSON: ${guestData.length}`)
  console.log(`Imported: ${imported}`)
  console.log(`Skipped (already exist): ${skipped}`)
  console.log(`Final count in Firestore: ${existingCount + imported}`)
  console.log('\nMigration complete!')

  process.exit(0)
}

migrate().catch((error) => {
  console.error('Migration failed:', error)
  process.exit(1)
})
