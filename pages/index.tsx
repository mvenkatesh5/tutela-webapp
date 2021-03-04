// next imports
import Link from "next/link";
// react bootstrap
import { Button, Form } from "react-bootstrap";
// layouts
import AuthWrapper from "layouts/authpagelayout";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const Home = () => {
  const meta = {
    title: "Tutela",
    description: META_DESCRIPTION,
  };
  return (
    <Page meta={meta}>
      <AuthWrapper>
        <h3 className="text-dark fw-bold mb-4">Welcome to Tutela</h3>
        <Link href="/signin">
          <Button className="w-100 rounded-2 shadow-sm mt-3">Sign In</Button>
        </Link>
        <Link href="/signup">
          <Button className="w-100 rounded-2 shadow-sm mt-3">Sign Up</Button>
        </Link>
      </AuthWrapper>
    </Page>
  );
};

export default Home;
