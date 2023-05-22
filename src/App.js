import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import { TweetProvider } from "./components/TweetContext";
import LoginPage from "./pages/LoginPage";
import { LoggedInProvider } from "./components/LoggedInContext";
import RegisterPage from "./pages/RegisterPage";
import { SearchProvider } from "./components/SearchContext";
import LikedPage from "./pages/LikedPage";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <>
      <LoggedInProvider>
        <TweetProvider>
          <SearchProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/liked" element={<LikedPage />} />
                <Route path="/UsersPage/:id" element={<UsersPage />} />
              </Routes>
            </BrowserRouter>
          </SearchProvider>
        </TweetProvider>
      </LoggedInProvider>
    </>
  );
}

export default App;
