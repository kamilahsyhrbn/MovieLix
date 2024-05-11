import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.jsx";
import TopRated from "./pages/TopRated.jsx";
import SearchMovie from "./pages/SearchMovie.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import DetailMovie from "./pages/DetailMovie.jsx";
import PopularMovies from "./pages/PopularMovies.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import BtnScrollTop from "./components/BtnScrollTop.jsx";
import UpComing from "./pages/Upcoming.jsx";
import NowPlaying from "./pages/NowPlaying.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Account from "./pages/Account.jsx";
import Register from "./pages/Register.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Access from "./pages/Access.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import DetailPerson from "./pages/DetailPerson.jsx";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <BtnScrollTop />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/top-rated",
        element: <TopRated />,
      },
      {
        path: "/search-movies",
        element: <SearchMovie />,
      },
      {
        path: "/detail-movies/",
        element: <DetailMovie />,
      },
      {
        path: "/popular-movies",
        element: <PopularMovies />,
      },
      {
        path: "/upcoming",
        element: <UpComing />,
      },
      {
        path: "/now-playing",
        element: <NowPlaying />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/detail-person",
        element: <DetailPerson />,
      },
    ],
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/access",
    element: <Access />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);
