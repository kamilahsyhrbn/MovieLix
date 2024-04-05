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
        path: "/detail-movies",
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
