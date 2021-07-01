import React from "react";
// next imports
import Link from "next/link";
// material icons
import { CheckCircle } from "@styled-icons/bootstrap/CheckCircle";
// layouts
import DefaultLayout from "@layouts/defaultLayout";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const ConfirmPasswordView = () => {
  const meta = {
    title: "Password Success",
    description: META_DESCRIPTION,
  };

  return (
    <>
      <Page meta={meta}>
        <DefaultLayout>
          <div className="default-form-wrapper">
            <div className="form-header flex-container">
              <div className="flex-icon">
                <CheckCircle />
              </div>
              <div className="flex-text primary-heading">Password Changed successfully</div>
            </div>
            <div className="form-footer text-center mt-4">
              <Link href="/signin">
                <a>Return to Sign In</a>
              </Link>
            </div>
          </div>
        </DefaultLayout>
      </Page>
    </>
  );
};

export default ConfirmPasswordView;
