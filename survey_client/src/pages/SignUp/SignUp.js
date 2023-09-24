import React, { useState, useEffect } from "react";

import {
  Container,
  Title,
  Buttons,
  Card,
  ErrorMessage,
} from "../SignIn/styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import SizedBox from "../../components/SizedBox";
import BackLink from "../../components/BackLink";
import { useAuth } from "../../contexts/auth";
import { URL_LOGIN } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [username, setUsername] = useState();

  // get registerUser method from api context
  const { userName, registerUser, error, } = useAuth();

  //  if there's user redirect to homepage
  useEffect(() => {
    if (userName) {
      return navigate("/");
    }
  }, [navigate, userName]);

  return (
    <React.Fragment>
      <Container>
        <Title>Sign Up</Title>
        <Card width="50%">
          <BackLink onClick={() => navigate(URL_LOGIN)}>Back to Login</BackLink>
          <form
            className="col s12"
            onSubmit={() => registerUser(username, email, password, password2)}
          >
            <Input
              id="email"
              name="email"
              icon="mail_outline"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Input>
            <Input
              id="password"
              name="password"
              icon="lock_outline"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Input>
            <Input
              id="password2"
              name="password2"
              icon="lock_outline"
              type="password"
              label="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            ></Input>

            <Input
              id="username"
              name="username"
              icon="person_outline"
              type="text"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            ></Input>
          </form>
          <ErrorMessage>{error}</ErrorMessage>
          <SizedBox height="20px" />
          <Buttons>
            <Button
              color="teal"
              onClick={() => registerUser(username, email, password, password2)}
            >
              Create Account
            </Button>
          </Buttons>
        </Card>
      </Container>
    </React.Fragment>
  );
}
