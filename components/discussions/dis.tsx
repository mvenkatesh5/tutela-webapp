import { Card } from "react-bootstrap";

function DiscussionFeaturedCard(props: any) {
  return (
    <>
      <Card className="discussion-featured-card">
        <div className="d-flex h-100 align-items-end">
          <div>
            <h4 className="text-white fw-bolder m-0">125 Questions</h4>
          </div>
        </div>
      </Card>
    </>
  );
}

export default DiscussionFeaturedCard;
