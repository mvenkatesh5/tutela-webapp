import React from "react";
// next imports
import Link from "next/link";
import { useRouter } from "next/router";
// react bootstrap
import { Container, Form, Button } from "react-bootstrap";
// layouts
import DefaultLayout from "@layouts/defaultLayout";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";
// api service
import { ForgotPassword } from "@lib/services/authenticationservice";

const ForgotPasswordView = () => {
  const meta = {
    title: "Forgot Password",
    description: META_DESCRIPTION,
  };
  const router = useRouter();

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);
  const [errorMessage, setErrorMessage] = React.useState<any>("");
  const [formData, setFormData] = React.useState({
    email: "",
  });
  const handleFormData = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    ForgotPassword(formData)
      .then((res) => {
        console.log(res);
        setButtonLoader(false);
        if (res && res.token) router.push(`/reset-password?token=${res.token}`);
      })
      .catch((error) => {
        setButtonLoader(false);
        setErrorMessage("Please enter the registered email!");
        console.log(error);
      });
  };

  return (
    <>
      <Page meta={meta}>
        <DefaultLayout>
          <Container>
            <Form onSubmit={handleFormSubmit}>
              <div className="default-form-wrapper">
                <div className="form-header">
                  <div className="primary-heading">Reset password with email</div>
                  <div className="primary-description">
                    Enter the email connected with your account to reset your password
                  </div>
                </div>
                <div className="form-content">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    id="forget-password-form-email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e: any) => handleFormData("email", e.target.value)}
                    required={true}
                  />
                </div>
                {errorMessage && <small className="text-danger">{errorMessage}</small>}
                <div className="form-footer">
                  <Button type="submit" className="btn-sm" disabled={buttonLoader}>
                    {buttonLoader ? "Processing..." : "Send Reset link to email"}
                  </Button>
                </div>
                <div className="form-footer text-center mt-5">
                  <Link href="/signin">
                    <a>Return to Sign In</a>
                  </Link>
                </div>
              </div>
            </Form>
          </Container>
        </DefaultLayout>
      </Page>
    </>
  );
};

export default ForgotPasswordView;
