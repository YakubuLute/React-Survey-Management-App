import React, { useEffect, useState } from "react";
import { Container, Title, Buttons, Card, ErrorMessage } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import SizedBox from "../../components/SizedBox";
import { useAuth } from "../../contexts/auth";
import { URL_REGISTER } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  // get signin method from api context

  const navigate = useNavigate();

  const { userName, loginUser, error, setError } = useAuth();

  //  if there's user redirect to homepage
  useEffect(() => {
    if (userName) {
      return navigate("/");
    }
  }, [navigate, userName]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      loginUser(username, email, password);
    }
  };

  return (
    <Container>
      <Title>Sign In</Title>
      <Card>
        <form
          className="col s12"
          onSubmit={() => loginUser(username, email, password)}
        >
          <Input
            id="username"
            name="username"
            icon="account_circle"
            type="text"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          ></Input>
          <Input
            id="email"
            name="email"
            icon="mail_outline"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
          ></Input>
          <Input
            id="password"
            name="password"
            icon="lock_outline"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          ></Input>
        </form>
        <ErrorMessage>{error}</ErrorMessage>
        <SizedBox height="20px" />
        <Buttons>
          <Button onClick={() => loginUser(username, email, password)}>
            Sign In
          </Button>
          <SizedBox height="30px" />
          <Button onClick={() => navigate(URL_REGISTER)} color="purple">
            Create Account
          </Button>
        </Buttons>
      </Card>
    </Container>
  );
}
