import React from "react";
// next imports
import Link from "next/link";
// layouts
import DefaultLayout from "@layouts/defaultLayout";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const ResetPasswordPage = () => {
  const meta = {
    title: "Reset Password",
    description: META_DESCRIPTION,
  };

  return (
    <>
      <Page meta={meta}>
        <DefaultLayout>
          <div className="default-form-wrapper">
            <div className="form-header">
              <div className="primary-heading">Email verification is restricted.</div>
              <div className="primary-description">
                Try using the same link that has been sent to your email.
              </div>
            </div>
            <div className="form-footer text-center mt-4">
              <Link href="/forgot-password">
                <a>Please confirm your email.</a>
              </Link>
            </div>
          </div>
        </DefaultLayout>
      </Page>
    </>
  );
};

export default ResetPasswordPage;
