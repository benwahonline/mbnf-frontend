const admin = require("firebase-admin");
const fs = require("fs");

// Path to your service account key
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Read cases.json
const cases = JSON.parse(fs.readFileSync("./cases.json", "utf8"));

async function importCases() {
  const batch = db.batch();

  cases.forEach((caseItem) => {
    const docRef = db.collection("cases").doc(); // Auto-ID
    batch.set(docRef, caseItem);
  });

  await batch.commit();
  console.log(`Imported ${cases.length} cases to Firestore!`);
}

importCases().catch(console.error);
