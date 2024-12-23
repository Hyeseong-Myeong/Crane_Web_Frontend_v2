import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout'
import Home from './routes/home'
import Profile from './routes/profile'
import Login from './routes/login';
import SignUp from './routes/SignUp';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Info from './routes/info';
import Gallery from './routes/gallery';
import Board from './routes/board';
import Reservation from './routes/reservation';
import Team from './routes/team';
import { useEffect, useState } from 'react';
import LoadingScreen from './components/loading-screen';
import ProtectedRoute from './components/protected-route';
import GalleryDetail from './routes/boardDetail';
import BoardDetail from './routes/boardDetail';
import EditBoard from './routes/editBoard';
import ReservationMy from './routes/reservationMy';
import { requestForToken, onMessageListener, registerServiceWorker } from './config/firebase.ts';
import { MessagePayload } from 'firebase/messaging';


const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children: [
       {
        path:"",
        element: <Home />
       },
       {
        path: "info",
        element: <Info />
       },
       {
        path: "gallery",
        element: <Gallery />,
       },
       {
        path: "gallery/detail/:boardId",
        element: <GalleryDetail />
       },
       {
        path: "board",
        element: <Board />
       },
       {
          path: "board/detail/:boardId",
          element: <BoardDetail />
       },
       {
          path: "board/edit",
          element: (<ProtectedRoute>
                      <EditBoard />
                    </ProtectedRoute>
                    ),
       },
       {
        path: "reservation",
        element: (
          <ProtectedRoute>
            <Reservation />
          </ProtectedRoute>
          ),
       },
       {
        path: "reservation/my",
        element: (
          <ProtectedRoute>
            <ReservationMy />
          </ProtectedRoute>
          ),
       },
       {
        path: "team",
        element: (
          <ProtectedRoute>
            <Team />
          </ProtectedRoute>
          ),
       },
       {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
       }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  }
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  body{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  /* display:flex; */
  height: 100vh;
  width: 100vw;
  
  justify-content:center;
`

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<MessagePayload | null>(null); // 타입 명시

  const init = async() => {
    //사용자 로그인 정보 가져오기
    // await getUserInfo();
    setIsLoading(false);
  }

  useEffect(() => {
    init();
  }, []);


  useEffect(() => {
    registerServiceWorker();

    requestForToken();
    let messageListener: Promise<any>; // messageListener의 타입을 명시적으로 지정

    messageListener = onMessageListener().then(payload => {
      setNotification(payload);
      console.log("새로운 알림: ", payload);
      if(payload.notification) {
        new Notification(payload.notification.title || "새 알림", {
          body: payload.notification.body || "알림 내용이 없습니다."
        });
      }
    });

    return () => {
      messageListener.then(unsubscribe => {
        unsubscribe(); // 필요시 구독 해제
      })
    }
  }, [])
  
  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  )
}

export default App;
