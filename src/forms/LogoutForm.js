import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";


const LogoutForm = () => {

  const [token, setTokenValue, removeToken, getToken, getDecodedToken] = useLocalStorage('token');
  const navigate = useNavigate()

  useEffect(() => {
    const token = getToken()
    console.log(token)

    const decodedToken = getDecodedToken()
    console.log(decodedToken)
  }, [])

  const logOut = () => {
    removeToken()
    // navigate('/')
  }

  return (
    <div>
      <p>Are you sure that you want to log out?</p>
      <button onClick={() => {logOut()}}>Log Out</button>
    </div>
  )
}

export default LogoutForm;