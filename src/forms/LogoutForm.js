import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

import '../styles/LogoutForm.css'

const LogoutForm = () => {

  const [token, setTokenValue, removeToken, getToken, getDecodedToken] = useLocalStorage('token');
  const navigate = useNavigate()

  useEffect(() => {
    const token = getToken()
    console.log(token)

    const decodedToken = getDecodedToken()
    console.log(decodedToken)
  }, [])

  const logOut = async () => {
    await removeToken()
    setTimeout(() => {
      navigate('/')
    }, 400)
  }

  return (
    <div className="logout-form-container">
      <p className="logout-message" >Are you sure that you want to log out?</p>
      <button className="logout-button" onClick={() => {logOut()}}>Log Out</button>
    </div>
  )
}

export default LogoutForm;