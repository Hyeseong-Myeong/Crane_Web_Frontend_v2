import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, MessagePayload, onMessage } from "firebase/messaging";
import { config } from "process";
// import {isMobile,isTablet, isDesktop} from 'react-device-detect';


interface DeviceInfoType {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    //브라우저 정보 추가
    userAgent: string;
    platform: string;
}

const firebaseConfig= {
    apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
    authDomain: `${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`,
    projectId: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`,
    storageBucket: `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID}`,
    appId: `${import.meta.env.VITE_FIREBASE_APP_ID}`,
    measurementId: `${import.meta.env.VITE_FIREBASE_MEASUREMENT_ID}`,
}

const VAPID_KEY = `${import.meta.env.VITE_FIREBASE_VAPID_KEY}`;



const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 서비스 워커 등록
export const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const configString = JSON.stringify(firebaseConfig);
            const encodedConfig = btoa(configString)


            const registration = await navigator.serviceWorker.register(
                `/firebase-messaging-sw.js?config=${encodedConfig}`
            );
            // console.log('Service Worker registered:', registration);
            return registration;
        } catch (error) {
            console.error('Service Worker registration failed:', error);
            return null;
        }
    } else {
        console.log('This browser does not support service workers.');
        return null;
    }
}

export const requestForToken = async() => {

    try{
        const token = localStorage.getItem('authorization');
        const FCMtoken = await getToken(messaging, { vapidKey: VAPID_KEY });
        const deviceInfo = navigator.userActivation;

        if (FCMtoken) {
        console.log("FCM 토큰:", FCMtoken);
        // 토큰을 서버에 저장하는 로직
        const payload = {
            "fcmToken" : FCMtoken,
            // "deviceInfo": deviceInfo
        };
        console.log(payload)
        //TODO: 최초 로그인 및 FCM 토큰이 갱신될때만 POST 하도록 수정
        //TODO : 로그아웃 시 FCM 토큰 삭제
        axios.post(
            `${import.meta.env.VITE_API_URL}/fcm`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                }
            },
        )

        return FCMtoken;
        } else {
        console.log("FCM 토큰을 얻을 수 없습니다.");
        requestPermission();
        return null;
        }
    } catch (error) {
        console.error("FCM 토큰 요청 중 오류:", error);
        return null;
    }
}

const requestPermission = async () => {
    try {
        await Notification.requestPermission();
    } catch (error) {
        console.error("알림 권한 요청 중 에러:", error);
    }
}

export const onMessageListener = () : Promise<MessagePayload>=>
    new Promise((resolve) => {
      onMessage(messaging, (payload: MessagePayload) => {
        resolve(payload);
      });
    });
  
  export default messaging;