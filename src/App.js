import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { getActiveUser, selectIsAuthenticated } from "./store/auth";

import "./App.css";
import NavBar from "./components/NavBar";
import GuestRoute from "./components/shared/GuestRoute";
import PrivateRoute from "./components/shared/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppGalleries from "./pages/AppGalleries";
import AddGallery from "./pages/AddGallery";
import UserGalleries from "./pages/UserGalleries";
import SingleGallery from "./pages/SingleGallery";
import AuthorGalleries from "./pages/AuthorGalleries";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getActiveUser());
    }
  }, []);

  return (
    <Router>
      <NavBar />
      <Switch>
        <GuestRoute exact path="/auth/login">
          <Login />
        </GuestRoute>
        <GuestRoute exact path="/auth/register">
          <Register />
        </GuestRoute>
        <PrivateRoute exact path="/create-gallery">
          <AddGallery />
        </PrivateRoute>
        <PrivateRoute exact path="/my-galleries">
          <UserGalleries />
        </PrivateRoute>
        <Route exact path="/galleries">
          <AppGalleries />
        </Route>
        <PrivateRoute exact path="/authors/:id">
          <AuthorGalleries />
        </PrivateRoute>
        <PrivateRoute exact path="/galleries/:id">
          <SingleGallery />
        </PrivateRoute>
        <Route exact path="/">
          <Redirect to="/galleries" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
