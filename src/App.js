import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, useParams } from "react-router-dom";

import WelcomePage from "./pages/WelcomePage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  function getParam(name) {
    const url = window.location.href;
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
  }


  const getUser = async () => {
    const token = localStorage.getItem('token') || getParam("api_key")
    const url = "https://127.0.0.1:5000/user/verify_api_key";
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    });
    if (response.ok){
      const data = await response.json();
      console.log(data);
      localStorage.setItem('token', token)
      // set User = data.user
    } else {
      alert("not login, invalid key")
      // setUuser = null
    }
  };

  useEffect(() => {
getUser();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <WelcomePage />
        </Route>
        <Route path="/signup" exact>
          <SignupPage />
        </Route>
        <Route path="/signin" exact>
          <SigninPage />
        </Route>
        <Route path="/home" exact>
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
