// next imports
import Link from "next/link";

const ThreadCardView = (props: any) => {
  return (
    <>
      <div className="thread-card">
        <div className="thread-card-header">
          <Link href={`/channels/${props.channel_id}/${props.data.id}`}>
            <a className="heading">{props.data.title}</a>
          </Link>
        </div>
        <div className="thread-card-edit-options">{props.children}</div>
      </div>
    </>
  );
};

export default ThreadCardView;
