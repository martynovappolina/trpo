import './App.css';
import Menu from './components/Menu/Menu'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import ToastContainer from './shared/ToastContainer/ToastContainer';
import { useEffect } from 'react';
import MenuPage from './pages/MenuPage/MenuPage';
import EventsListPage from './pages/EventsListPage/EventsListPage';
import WatchPage from './pages/WatchPage/WatchPage';

function App() {
  const componentWithMenu = (component) =>{
    return <>
      <Menu />
      {component}
    </>;
  };

  const router = createBrowserRouter(
    [
      {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />
      },
      {
        path: "/menu",
        element: componentWithMenu(<MenuPage />),
        errorElement: <ErrorPage />
      },
      {
        path: "/events",
        element: componentWithMenu(<EventsListPage />),
        errorElement: <ErrorPage />
      },
      {
        path: "/watch",
        element: componentWithMenu(<WatchPage />),
        errorElement: <ErrorPage />
      },
    ]
  )

  useEffect((() => {
    if(localStorage.getItem('token') == null) {
      if(window.location.pathname !== '/login')
        window.location = '/login'      
    }
  }), [])

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
