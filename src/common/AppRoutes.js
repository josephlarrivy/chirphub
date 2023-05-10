import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Feed from "../components/Feed";
import NavBar from "../components/NavBar";
import TestComponent from "../components/TestComponent";


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
            <Route exact path="/test"
              element={<TestComponent />}
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