# Firebase Security Rules

Copy these rules into your Firebase Console after creating your project.

## Firestore Rules

Go to **Firestore Database > Rules** and paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /routes/{routeId} {
      // Anyone can read routes (public page)
      allow read: if true;
      // Only your admin account can write
      allow write: if request.auth != null
                   && request.auth.token.email == 'YOUR_EMAIL@gmail.com';
    }
    match /points/{pointId} {
      // Anyone can read points (public page)
      allow read: if true;
      // Only your admin account can write
      allow write: if request.auth != null
                   && request.auth.token.email == 'YOUR_EMAIL@gmail.com';
    }
  }
}
```

## Storage Rules

Go to **Storage > Rules** and paste:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /gpx/{allPaths=**} {
      // Anyone can read (download GPX files)
      allow read: if true;
      // Only your admin account can upload/delete
      allow write: if request.auth != null
                   && request.auth.token.email == 'YOUR_EMAIL@gmail.com';
      // Limit uploads to 10MB
      allow create: if request.resource.size < 10 * 1024 * 1024;
    }
    match /csv/{allPaths=**} {
      // Anyone can read (download CSV files)
      allow read: if true;
      // Only your admin account can upload/delete
      allow write: if request.auth != null
                   && request.auth.token.email == 'YOUR_EMAIL@gmail.com';
      // Limit uploads to 5MB
      allow create: if request.resource.size < 5 * 1024 * 1024;
    }
  }
}
```

## Setup Checklist

1. Create a Firebase project at https://console.firebase.google.com
2. **Authentication**: Enable Google sign-in provider
3. **Authentication > Settings > Authorized domains**: Add `thomas12358.github.io`
4. **Firestore Database**: Create database (start in production mode)
5. **Firestore > Rules**: Paste the Firestore rules above (replace email)
6. **Storage**: Create default bucket
7. **Storage > Rules**: Paste the Storage rules above (replace email)
8. **Project Settings > General > Your Apps**: Add a Web App, copy config
9. Paste config values into `assets/js/firebase-config.js`
10. Set `ADMIN_EMAIL` in `firebase-config.js` to your Google account email
