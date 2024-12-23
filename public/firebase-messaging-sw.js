// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js"); // 최신 버전으로 업데이트 필요
importScripts("https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js"); // 최신 버전으로 업데이트 필요

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: `${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`,
  storageBucket: `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID}`,
  appId:  `${import.meta.env.VITE_FIREBASE_APP_ID}`,
  measurementId: `${import.meta.env.VITE_FIREBASE_MEASUREMENT_ID}` // 선택적
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.data.title || "백그라운드 알림"; // data로 변경
  const notificationOptions = {
    body: payload.data.body || "알림 내용이 없습니다.", // data로 변경
    // icon: "/logo(black).png", // 알림 아이콘 (public 폴더에 위치)
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});