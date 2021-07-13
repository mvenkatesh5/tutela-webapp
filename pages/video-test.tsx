// next imports
import Link from "next/link";
// react bootstrap
import { Container, Image } from "react-bootstrap";

const ViewPage = () => {
  return (
    <div>
      <div className="video-wrapper">
        <div className="header-wrapper">
          <Link href="/">
            <a>
              <Image src="/logo.svg" />
            </a>
          </Link>
        </div>
        <div className="content-wrapper">
          <Container>
            <div className="content-heading">Video Test Preview</div>
            <div className="video-container">
              <iframe
                src="https://iframe.mediadelivery.net/embed/8356/bc0fe775-4b4e-404a-b011-ef0a7c5937ff?autoplay=true"
                loading="lazy"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen={true}
              ></iframe>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
