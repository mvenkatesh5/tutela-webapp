// next imports
import Link from "next/link";
// react bootstrap
import { Card } from "react-bootstrap";

const DiscussionFeaturedCard = (props: any) => {
  return (
    <>
      <Card className="discussion-card">
        <Link
          href={`/channels/${
            props.data && props.data.settings && props.data.settings.collapse
              ? `${1}?view=collapse`
              : `${1}`
          }`}
        >
          <a className="discussion-card-header">
            <div className="heading">{props.data.name}</div>
            <div className="description">{props.data.description}</div>
          </a>
        </Link>
        <div className="discussion-card-edit-options">{props.children}</div>
      </Card>
    </>
  );
};

export default DiscussionFeaturedCard;
