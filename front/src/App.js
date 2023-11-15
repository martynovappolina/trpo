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
    ]
  )

  // useEffect((() => {
  //   if(localStorage.getItem('token') !== null) window.location.pathname = '/login'
  // }), [])

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
