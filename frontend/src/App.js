import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignUpForm from "./components/SignUpFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import SingleSpotPage from "./components/SingleSpotPage";
import OwnerSpotsPage from "./components/OwnerSpotsPage";
import ReviewForm from "./components/ReviewSpotModal/ReviewForm";

function App() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
          // could live within the signupformpage folder, those components will display if children of folder.
            <SignUpForm />
          </Route>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route exact path="/spots/:spotId">
            <SingleSpotPage />
          </Route>
          <Route path="/my-listings">
            <OwnerSpotsPage />
          </Route>
          <Route path="/testing">
            <ReviewForm />
          </Route>
        </Switch>
      )}
    </>
  );
};

export default App;
