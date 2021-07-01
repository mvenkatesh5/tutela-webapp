import React from "react";
// next imports
import Link from "next/link";
import { useRouter } from "next/router";
// react bootstrap
import { Form, Button } from "react-bootstrap";
// material icons
import { CheckCircle } from "@styled-icons/bootstrap/CheckCircle";
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

  const [mailSuccess, setMailSuccess] = React.useState<any>(false);
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
    setMailSuccess(false);
    ForgotPassword(formData)
      .then((res) => {
        console.log(res);
        setButtonLoader(false);
        if (res && res.message && res.message === "success") setMailSuccess(true);
        // router.push(`/reset-password?token=${res.token}`);
      })
      .catch((error) => {
        setButtonLoader(false);
        setErrorMessage("Please provide a valid email address!");
        console.log(error);
      });
  };

  return (
    <>
      <Page meta={meta}>
        <DefaultLayout>
          {!mailSuccess ? (
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
          ) : (
            <div className="default-form-wrapper">
              <div className="form-header flex-container">
                <div className="flex-icon">
                  <CheckCircle />
                </div>
                <div className="ms-3 flex-text primary-heading">
                  Email sent successfully to <strong>{formData.email}.</strong>
                </div>
              </div>
              <div className="primary-description text-center">
                An email has been sent to your email address. Follow the directions in the email to
                reset your password.
              </div>
            </div>
          )}
        </DefaultLayout>
      </Page>
    </>
  );
};

export default ForgotPasswordView;
