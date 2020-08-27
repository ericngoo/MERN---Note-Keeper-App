import React, { useState } from 'react';
import MainPage from './MainPage';
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currUser, setCurrUser] = useState("")

  function checkLoginStatus(loggedIn) {
    setIsLoggedIn(loggedIn)
  }

  function setUser(user) {
    setCurrUser(user)
  }
  
  return (
    <div>
      {isLoggedIn && currUser ? <MainPage currentUser={currUser} sessionStatus={checkLoginStatus}/> : <Login sessionStatus={checkLoginStatus} currentUser={setUser}/> }
    </div>
  );
}

export default App;