import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Feed from "../components/Feed";
import NavBar from "../components/NavBar";
import AddTagsToChirpForm from "../forms/AddTagsToChirpForm";
import LoginForm from "../forms/LoginForm";
import LogoutForm from "../forms/LogoutForm";
import RegisterForm from "../forms/RegisterForm";


import '../styles/AppRoutes.css'

const AppRoutes = () => {

  return (
    <div id="page-main-container">
      <BrowserRouter>
        <div id="nav-outer-container">
          <NavBar />
        </div>
        <div id="feed-outer-container">
          <Routes>
            <Route exact path="/"
              element={<Feed />}
            />
            <Route exact path="/register"
              element={<RegisterForm />}
            />
            <Route exact path="/login"
              element={<LoginForm />}
            />
            <Route exact path="/logout"
              element={<LogoutForm />}
            />
            <Route exact path="/addTagsToChirpForm"
              element={<AddTagsToChirpForm />}
            />
          </Routes>
        </div>
        <div id="right-outer-container">

        </div>
      </BrowserRouter>
    </div>
  )
}

export default AppRoutes;