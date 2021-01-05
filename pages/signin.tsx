import React from "react";
// components
import Page from "@components/page";
import { META_DESCRIPTION } from "@constants/page";
// layouts
import AuthWrapper from "layouts/authpagelayout";
import { LogIn } from "@lib/services/authenticationservice";
// react bootstrap
import { Button, Form } from "react-bootstrap";

export default function SignInView() {
  const meta = {
    title: "Sign Up",
    description: META_DESCRIPTION,
  };

  const [email, setEmail] = React.useState(String);
  const [password, setPassword] = React.useState(String);

  const SignInSubmit = (e: any) => {
    e.preventDefault();
    const payload = { email, password };
    console.log(payload);

    LogIn(payload)
      .then((res: any) => {
        console.log(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <Page meta={meta}>
      <AuthWrapper>
        <h3 className="text-dark fw-bold mb-4">Log In!</h3>

        <Form onSubmit={SignInSubmit}>
          <Form.Group className="mb-2">
            <Form.Label className="mb-1 text-muted">Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="mb-1 text-muted">Enter Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button className="w-100 rounded-2 shadow-sm mb-3" variant="primary" type="submit">
            Login
          </Button>
          <div
            className="text-center w-100"
            style={{
              height: "15px",
              borderBottom: "1px solid #eee",
            }}
          >
            <span className="bg-white px-3 text-muted fw-bold">or</span>
          </div>

          <Button className="w-100 rounded-2 shadow-sm mt-3" variant="light">
            Sign In with Google
          </Button>
        </Form>
      </AuthWrapper>
    </Page>
  );
}
