import React from "react";
// next imports
import { useRouter } from "next/router";
import Page from "@components/page";
import { META_DESCRIPTION } from "@constants/page";
import Link from "next/link";
// layouts
import AuthWrapper from "layouts/authpagelayout";
import { SignUp } from "@lib/services/authenticationservice";
// react bootstrap
import { Button, Form, Alert } from "react-bootstrap";
// cookie
import { setAuthenticationToken } from "@lib/cookie";
// hoc
import withoutAuth from "@lib/hoc/withoutAuth";

const SignUpView = () => {
  const router = useRouter();

  const [buttonLoader, setButtonLoader] = React.useState(false);

  const [alertData, setAlertData] = React.useState({
    variant: "info",
    show: false,
    message: "",
  });
  function onAlertClose() {
    setAlertData({ ...alertData, show: false });
  }

  const meta = {
    title: "Sign Up",
    description: META_DESCRIPTION,
  };

  const [authData, setAuthData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const handleAuthData = (key: any, value: String) => {
    setAuthData({ ...authData, [key]: value });
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    console.log(authData);
    setButtonLoader(true);

    setAlertData({
      ...alertData,
      show: false,
    });

    SignUp(authData)
      .then((res: any) => {
        console.log(res);
        redirectToAdmin(res);
        setButtonLoader(false);
      })
      .catch((error: any) => {
        console.log(error);
        setButtonLoader(false);
        setAlertData({
          ...alertData,
          variant: "danger",
          show: true,
          message: error.detail ? error.detail : "Please check your credentials",
        });
      });
  };

  const redirectToAdmin = (tokenDetails: any) => {
    setAuthenticationToken(tokenDetails);
    router.push("/dashboard");
  };

  return (
    <Page meta={meta}>
      <AuthWrapper>
        <h3 className="text-dark fw-bold mb-4">Sign Up!</h3>

        <Alert
          variant={alertData.variant}
          show={alertData.show}
          onClose={() => onAlertClose()}
          dismissible
        >
          {alertData.message}
        </Alert>

        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mb-2">
            <Form.Label className="mb-1 text-muted">First Name*</Form.Label>
            <Form.Control
              value={authData.first_name}
              onChange={(e) => handleAuthData("first_name", e.target.value)}
              type="text"
              placeholder="Enter first name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="mb-1 text-muted">Last Name</Form.Label>
            <Form.Control
              value={authData.last_name}
              onChange={(e) => handleAuthData("last_name", e.target.value)}
              type="text"
              placeholder="Enter last name"
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="mb-1 text-muted">Email address*</Form.Label>
            <Form.Control
              value={authData.email}
              onChange={(e) => handleAuthData("email", e.target.value)}
              type="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="mb-1 text-muted">Enter Password</Form.Label>
            <Form.Control
              value={authData.password}
              onChange={(e) => handleAuthData("password", e.target.value)}
              type="password"
              placeholder="Enter password"
              required
            />
          </Form.Group>

          <Button
            className="w-100 rounded-2 shadow-sm mb-3"
            variant="primary"
            type="submit"
            disabled={buttonLoader}
          >
            {buttonLoader ? "Registering..." : "Register Account"}
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

          <Link href="/signin">
            <a>
              <Button className="w-100 rounded-2 shadow-sm mt-3" variant="light">
                Already have an account? Sign In
              </Button>
            </a>
          </Link>
        </Form>
      </AuthWrapper>
    </Page>
  );
};

export default withoutAuth(SignUpView);
