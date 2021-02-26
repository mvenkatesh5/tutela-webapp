// next imports
import Link from "next/link";

const ChannelCardView = (props: any) => {
  return (
    <>
      <div className="discussion-card">
        <div className="discussion-card-icon">{props.data.name.substring(0, 1)}</div>
        <Link
          href={`/channels/${
            props.data && props.data.settings && props.data.settings.collapse
              ? `${props.data.id}?view=collapse`
              : `${props.data.id}`
          }`}
        >
          <a className="discussion-card-header">
            <div className="heading">{props.data.name}</div>
            <div className="description">{props.data.description}</div>
          </a>
        </Link>
        <div className="discussion-card-edit-options">{props.children}</div>
      </div>
    </>
  );
};

export default ChannelCardView;
