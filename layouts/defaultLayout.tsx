// next imports
import Link from "next/link";
// react bootstrap
import { Container, Image } from "react-bootstrap";

type Props = {
  children: React.ReactNode;
};

const DefaultLayout = (props: Props) => {
  return (
    <>
      <div className="default-layout-wrapper">
        <div className="navbar-container">
          <Container>
            <div className="default-navbar-wrapper">
              <div className="navbar-root-brand">
                <Link href="/">
                  <a>
                    <Image src="/logo.svg" />
                  </a>
                </Link>
              </div>
              <div className="navbar-root-item-container">
                <Link href="/signin">
                  <a>
                    <div className="navbar-root-item">
                      <div className="icon default-svg-icon">{/* <ChatHelp /> */}</div>
                      <div className="text">Sign In</div>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </Container>
        </div>
        <Container>
          <div className="content-container">{props.children}</div>
        </Container>
      </div>
    </>
  );
};

export default DefaultLayout;
