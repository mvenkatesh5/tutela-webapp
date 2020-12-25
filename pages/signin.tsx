import Page from "@components/page";
import { META_DESCRIPTION } from "@constants/page";
import Link from "next/link"
// layouts
import AuthWrapper from "layouts/authpagelayout";

// react bootstrap
import { Button, Form } from "react-bootstrap";

export default function SignIn() {
  const meta = {
    title: "Sign Up",
    description: META_DESCRIPTION,
  };
  return (
    <Page meta={meta}>
      <AuthWrapper>
        <h3 className="text-dark fw-bold mb-4">Log In!</h3>

        <Form>
          <Form.Group className="mb-2">
            <Form.Label className="mb-1 text-muted">Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="mb-1 text-muted">Enter Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Check
              type="checkbox"
              label="Remember me"
            />
          </Form.Group>
          <Link href="/dashboard">
          <Button
            className="w-100 rounded-2 shadow-sm mb-3"
            variant="primary"
            type="submit"
          >
            Login
          </Button>
          </Link>
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