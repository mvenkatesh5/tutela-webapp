import { Heading, Spinner } from "amazon-chime-sdk-component-library-react";
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="tw-flex tw-w-screen tw-h-screen tw-justify-center tw-items-center">
      <Heading level={4}>Loading</Heading>
      <Spinner height="4rem" width="4rem" />
    </div>
  );
};

export default LoadingScreen;
