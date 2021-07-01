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
import { ResetPassword } from "@lib/services/authenticationservice";

const ResetPasswordPage = () => {
  const meta = {
    title: "Reset Password",
    description: META_DESCRIPTION,
  };
  const router = useRouter();
  const token = router.query.token;

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);
  const [passwordMatch, setPasswordMatch] = React.useState<any>("");
  const [formData, setFormData] = React.useState({
    email: "random@gmail.com",
    passwordOne: "",
    passwordTwo: "",
  });
  const handleFormData = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    setPasswordMatch("");
    if (token && formData.passwordOne === formData.passwordTwo) {
      const payload = {
        token: "token",
        password: formData.passwordOne,
      };
      ResetPassword(payload)
        .then((res) => {
          console.log(res);
          setButtonLoader(false);
          router.push("/confirm-password");
        })
        .catch((error) => {
          setButtonLoader(false);
          console.log(error);
        });
    } else {
      setButtonLoader(false);
      setPasswordMatch("Please check the passwords you entered are not matching.");
    }
  };

  return (
    <>
      <Page meta={meta}>
        <DefaultLayout>
          {token ? (
            <Form onSubmit={handleFormSubmit}>
              <div className="default-form-wrapper">
                <div className="form-header">
                  <div className="primary-heading">Set your new password</div>
                  <div className="primary-description">Enter your new password.</div>
                </div>
                <div className="form-content">
                  {/* <Form.Label>Email Address</Form.Label>
                <Form.Control
                  id="new-password-form-email"
                  type="text"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(value: any) => handleFormData("email", value)}
                  required={true}
                  disabled={true}
                /> */}
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    id="new-password-form-password-one"
                    type="password"
                    placeholder="Enter new password"
                    value={formData.passwordOne}
                    onChange={(value: any) => handleFormData("passwordOne", value)}
                    required={true}
                  />
                  <Form.Label>Confirm new password</Form.Label>
                  <Form.Control
                    id="new-password-form-password-two"
                    type="password"
                    placeholder="Re-type your password"
                    value={formData.passwordTwo}
                    onChange={(value: any) => handleFormData("passwordTwo", value)}
                    required={true}
                  />
                </div>
                {passwordMatch && <small>{passwordMatch}</small>}
                <div className="form-footer">
                  <Button type="submit" className="btn-sm">
                    Change password
                  </Button>
                </div>
              </div>
            </Form>
          ) : (
            <div className="default-form-wrapper">
              <div className="form-header">
                <div className="primary-heading">Email verification is restricted.</div>
              </div>
              <div className="form-footer text-center mt-4">
                <Link href="/forgot-password">
                  <a>Please confirm your email.</a>
                </Link>
              </div>
            </div>
          )}
        </DefaultLayout>
      </Page>
    </>
  );
};

export default ResetPasswordPage;
