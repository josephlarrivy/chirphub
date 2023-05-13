import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Bookmarks from "../components/Bookmarks";
import ChirpsByTag from "../components/ChirpsByTag";
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
            {/* <Route exact path="/addTagsToChirpForm"
              element={<AddTagsToChirpForm />}
            /> */}
            <Route exact path="/tag/:tagId"
              element={<ChirpsByTag />}
            />
            <Route exact path="/bookmarks"
              element={<Bookmarks />}
            />
          </Routes>
        </div>
        <div id="right-outer-container">
          <div className="ad-container">
            <a href="https://joseph-larrivy-portfolio.herokuapp.com/" target="_blank" rel="noopener noreferrer">
              <div className="ad-image" style={{ backgroundImage: `url(${require('../images/josephlarrivyad.png')})` }}></div></a>
          </div>
          <div className="ad-container">
            <a href="https://parkexplorerpro-client.herokuapp.com/" target="_blank" rel="noopener noreferrer">
              <div className="ad-image" style={{ backgroundImage: `url(${require('../images/parksad.png')})` }}></div></a>
          </div>
          <div className="ad-container">
            <a href="https://nasa-exploration.herokuapp.com/" target="_blank" rel="noopener noreferrer">
              <div className="ad-image" style={{ backgroundImage: `url(${require('../images/nasaad.png')})` }}></div></a>
          </div>
        </div>


      </BrowserRouter>
    </div>
  )
}

export default AppRoutes;