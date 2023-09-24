import React from "react";
import { useState, useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import "materialize-css/dist/css/materialize.min.css";
import SignUp from "./pages/SignUp/SignUp";
import Results from "./pages/Results";
import Survey from "./pages/SurveyDetails";
import SurveyListing from "./pages/SurveyListing";
import CreateSurvey from "./pages/CreateSurvey";
import "react-toastify/dist/ReactToastify.css";
import "materialize-css";
import AuthContext, { useAuth } from "./contexts/auth";
import Page404 from "./pages/Page404/page404";

//
function CustomRoutes() {
  const { user, isAdmin, setUser, userData, registerUser, error, setError } =
    useAuth();

  return (
    <>
      <Routes>
        <Route path={"/"} element={<SurveyListing />} />
        <Route path={"/register"} element={<SignUp />} />
        <Route path={"/login"} element={<SignIn />} />
        <Route path={"/create"} element={<CreateSurvey />} />
        <Route path={"survey-details"} element={<Survey />} />
        <Route path={"survey/:surveyId/complete"} element={<Survey />} />
        <Route path={"survey/:surveyId"} element={<Survey />} />
        <Route
          path={"survey/:surveyId/questions/:questionId"}
          element={<Survey />}
        />
        <Route path={"results/:id"} element={<Results />} />
        <Route path={"/*"} element={<Page404 />} />
      </Routes>
    </>
  );
}

export default CustomRoutes;
