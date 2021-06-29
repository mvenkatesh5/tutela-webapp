import React from "react";
// next imports
import Link from "next/link";
import { useRouter } from "next/router";
// components
import Page from "@components/page";
import { META_DESCRIPTION } from "@constants/page";
// layouts
import AuthWrapper from "layouts/authpagelayout";
import { LogIn } from "@lib/services/authenticationservice";
// react bootstrap
import { Button, Form } from "react-bootstrap";
// cookie
import { setAuthenticationToken } from "@lib/cookie";
// global context provider
import { globalContext } from "@contexts/global";
// hoc
import withoutAuth from "@lib/hoc/withoutAuth";

const SignInView = () => {
  const [globalState, globalDispatch] = React.useContext(globalContext);
  const router = useRouter();

  const [buttonLoader, setButtonLoader] = React.useState(false);

  const meta = {
    title: "Signin",
    description: META_DESCRIPTION,
  };

  const [email, setEmail] = React.useState(String);
  const [password, setPassword] = React.useState(String);

  const SignInSubmit = (e: any) => {
    e.preventDefault();
    const payload = { email, password };
    setButtonLoader(true);

    LogIn(payload)
      .then((res: any) => {
        redirectToAdmin(res);
        setButtonLoader(false);
      })
      .catch((error: any) => {
        console.log(error);
        setButtonLoader(false);
        globalDispatch({
          type: "ADD_TOAST_ALERT",
          payload: {
            kind: "warning",
            heading: "warning",
            description: `Please check your credentials.`,
          },
        });
      });
  };

  const redirectToAdmin = (tokenDetails: any) => {
    setAuthenticationToken(tokenDetails);
    if (tokenDetails.user.role === 0) router.push("/dashboard");
    if (tokenDetails.user.role === 1) router.push("/dashboard");
    if (tokenDetails.user.role === 2) router.push("/calendar");
    if (tokenDetails.user.role === 3) router.push("/parent/dashboard");
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
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="mb-1 text-muted">Enter Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>

          <Button
            className="w-100 rounded-2 shadow-sm mb-3"
            variant="primary"
            type="submit"
            disabled={buttonLoader}
          >
            {buttonLoader ? "Logging in..." : "Login"}
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

          <Link href="/signup">
            <a>
              <Button className="w-100 rounded-2 shadow-sm mt-3" variant="light">
                Register
              </Button>
            </a>
          </Link>
        </Form>
      </AuthWrapper>
    </Page>
  );
};

export default withoutAuth(SignInView);
