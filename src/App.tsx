import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout'
import Home from './routes/home'
import Profile from './routes/profile'
import Login from './routes/login';
import SignUp from './routes/SignUp';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Info from './routes/info';
import Gallery from './routes/gallery';
import Board from './routes/board';
import Reservation from './routes/reservation';
import Team from './routes/team';

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
        element: <Reservation />
       },
       {
        path: "team",
        element: <Team />
       },
       {
        path: "profile",
        element: <Profile />
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
  ${reset}
  body{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  )
}

export default App
