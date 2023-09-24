import React from "react";

import {
  Container,
  LeftContainer,
  RightContainer,
  Center,
  Card,
  User,
  LogoutButton,
} from "./styles";
import Button from "../Button";
import Avatar from "../Avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import user_profile from "../../assets/img/user.jpg";
import { URL_ROOT, URL_LOGIN, URL_CREATE } from "../../utils/constants";

function Header({
  createSurvey = true,
  showUser = true,
  showHome = false,
  leftButtons,
}) {
  const navigate = useNavigate();
  const { userName, userData, isAdmin } = useAuth();

  const logout = () => {
    localStorage.removeItem("username");
    navigate("/login");
    // force a refresh
    return document.location.reload();
  };

  const userInfo = userName ? (
    <p style={{ color: "white", textTransform: "capitalize" }}>
      Welcome {userName}!<LogoutButton onClick={logout}> Logout</LogoutButton>
    </p>
  ) : (
    <Card onClick={() => navigate(URL_LOGIN)}>
      <User>Login</User>
      <Avatar size="25px" src={user_profile}></Avatar>
    </Card>
  );

  return (
    <Container>
      <LeftContainer>
        {showHome ? (
          <LogoutButton onClick={() => navigate(URL_ROOT)}>Home</LogoutButton>
        ) : (
          createSurvey &&
          isAdmin && (
            <Button color="green" onClick={() => navigate(URL_CREATE)}>
              Create New Survey
            </Button>
          )
        )}
        {leftButtons && leftButtons}
      </LeftContainer>

      <RightContainer>{showUser && userInfo}</RightContainer>
    </Container>
  );
}

export default Header;
