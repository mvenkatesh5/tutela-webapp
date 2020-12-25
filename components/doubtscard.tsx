import { Card, Image, Button } from "react-bootstrap";

function Doubts() {
  return (
    <>
      <Card className="border-0 shadow mb-3">
        <Card.Body className="p-3 text-center">
          <Image
            className="img-fluid mx-auto d-block mt-4"
            src="/questions.svg"
          />
          <h5 className="text-dark fw-bold text-center mt-3">
            Ask your doubts
          </h5>
          <p className="text-muted text-center">
            Get your doubts cleared from our expert <br /> mentors and move fast
            towards your goal.
          </p>
          <Button variant="outline-primary rounded-2">Ask a doubt</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default Doubts;
