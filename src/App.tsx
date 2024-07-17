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
        element: <Gallery />
       },
       {
        path: "board",
        element: <Board />
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
  const init = async() => {
    //사용자 로그인 정보 가져오기  
    //await
    setIsLoading(false);
  }
  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  )
}

export default App
