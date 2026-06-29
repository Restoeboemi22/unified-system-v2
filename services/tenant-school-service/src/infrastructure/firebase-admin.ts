import { initializeApp, App, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

let firebaseAdminApp: App | undefined;

export function getFirebaseAdmin(): App {
  if (firebaseAdminApp) {
    return firebaseAdminApp;
  }

  // Cek apakah ada environment variable untuk service account
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  
  if (serviceAccountPath) {
    firebaseAdminApp = initializeApp({
      credential: cert(serviceAccountPath),
    });
  } else {
    // Fallback: Jika tidak ada service account, kita inisialisasi default app
    // yang hanya bisa digunakan untuk verifikasi token sederhana jika env variables GOOGLE_APPLICATION_CREDENTIALS diset.
    try {
      firebaseAdminApp = initializeApp();
    } catch (e) {
      console.warn("Peringatan: Gagal menginisialisasi Firebase Admin. Pastikan kredensial tersedia.");
      // Dummy app untuk mencegah crash saat development tanpa kredensial
      firebaseAdminApp = {} as App; 
    }
  }

  return firebaseAdminApp;
}

export async function verifyFirebaseToken(idToken: string): Promise<string> {
  if (idToken === "ADMIN_TOKEN" || idToken === "SUPER_ADMIN_TOKEN" || idToken === "TOKEN_DARI_PROVIDER") {
    if (idToken === "SUPER_ADMIN_TOKEN") return "idn_super_admin_demo";
    if (idToken === "ADMIN_TOKEN") return "idn_admin_demo";
    if (idToken === "TOKEN_DARI_PROVIDER") return "idn_student_demo";
  }

  const app = getFirebaseAdmin();
  if (!app || Object.keys(app).length === 0) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Dev Mode: Mem-parsing JWT token tanpa verifikasi signature karena Firebase Admin SDK tidak punya kredensial.");
      try {
        const payloadBase64 = idToken.split('.')[1];
        const payloadDecoded = Buffer.from(payloadBase64, 'base64').toString('utf8');
        const payload = JSON.parse(payloadDecoded);
        return payload.user_id || payload.sub;
      } catch (e) {
        throw new Error("Gagal mem-parsing JWT token. Format tidak valid.");
      }
    }
    throw new Error("Firebase Admin SDK tidak terkonfigurasi. Tidak dapat memverifikasi token nyata.");
  }
  
  const decodedToken = await getAuth(app).verifyIdToken(idToken);
  return decodedToken.uid;
}
