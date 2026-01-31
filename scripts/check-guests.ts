import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, limit, query } from 'firebase/firestore'
import { config } from 'dotenv'

config({ path: '.env.local' })

const app = initializeApp({
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
})

const db = getFirestore(app)

async function checkGuests() {
  const snapshot = await getDocs(query(collection(db, 'guests'), limit(5)))

  console.log('Sample of 5 guests:\n')
  for (const docSnap of snapshot.docs) {
    const data = docSnap.data()
    console.log(`${data.name}:`)
    console.log(`  confirmed: ${data.confirmed} (type: ${typeof data.confirmed})`)
    console.log('')
  }

  process.exit(0)
}

checkGuests()
