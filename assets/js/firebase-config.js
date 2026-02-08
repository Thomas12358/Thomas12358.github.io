// =============================================================
// Firebase Configuration — Replace these with your project values
// =============================================================
// 1. Go to https://console.firebase.google.com
// 2. Create a project (or use an existing one)
// 3. Add a Web App (Project Settings > General > Your Apps > Add App > Web)
// 4. Copy the firebaseConfig object and paste the values below
// 5. Enable Authentication > Google sign-in provider
// 6. Create a Firestore database (production mode)
// 7. Create a Storage bucket
// 8. Deploy security rules (see assets/firebase-rules.md for templates)
//
// IMPORTANT: Restrict the authorized domain in Firebase Console:
//   Authentication > Settings > Authorized domains
//   Add: thomas12358.github.io
//   (localhost is included by default for testing)

const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Set this to your Google account email to restrict who can upload
const ADMIN_EMAIL = "your-email@gmail.com";
