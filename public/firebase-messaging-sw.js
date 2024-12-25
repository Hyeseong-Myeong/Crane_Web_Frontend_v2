importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"); 

// URLSearchParams를 사용하여 쿼리 파라미터 가져오기
const urlParams = new URLSearchParams(self.location.search);
const encodedConfig = urlParams.get('config');

if(encodedConfig){
  try{
    const configString = atob(encodedConfig);

    const firebaseConfig = JSON.parse(configString)

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
        icon: "/logo(black).png", // 알림 아이콘 (public 폴더에 위치)
      };
    
      return self.registration.showNotification(notificationTitle, notificationOptions);
    });
  }catch(error){
    console.error("Failed to initialize Firebase in service worker:", error);

  }
}else{
  console.error("Firebase config not provided in service worker.");
}





