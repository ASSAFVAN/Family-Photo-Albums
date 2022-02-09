import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Header from "./components/Header/Header";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import SignOut from "./components/SignOut/SignOut";
import NotFound from "./components/NotFound/NotFound";
import AlbumsList from "./components/AlbumsList/AlbumsList";
import ShowAlbum from "./components/ShowAlbum/ShowAlbum";
import AddNewAlbum from "./components/AddNewAlbum/AddNewAlbum";
import AlbumImage from "./components/AlbumImage/AlbumImage";

function App() {
  const [token, setToken] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (token) {
      console.log(token);

      localStorage.setItem("token", JSON.stringify(token));
    }
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    setToken(userToken);
    // history.push("/albumslist");
  }, [token]);

  if (!token) {
    return <SignIn setToken={setToken} />;
  }

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signout" exact component={SignOut} />
          <Route path="/albumslist" exact component={AlbumsList} />
          <Route path="/showalbum/:id" exact component={ShowAlbum} />
          <Route path="/albums/image" exact component={AlbumImage} />
          <Route path="/albums/addalbum" exact component={AddNewAlbum} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
