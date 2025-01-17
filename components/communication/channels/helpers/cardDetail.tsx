// next imports
import Link from "next/link";

const ChannelCardView = (props: any) => {
  return (
    <>
      <div className="card p-3 border-0 shadow">
        <div className="position-absolute top-0 end-0 p-3">{props.children}</div>

        <div className="d-flex align-items-center">
          <div className="bg-light rounded p-4">
            <span className="fw-bolder">{props.data.name.substring(0, 1)}</span>
          </div>

          <div className="ms-3">
            <Link
              href={`/channels/${
                props.data && props.data.settings && props.data.settings.collapse
                  ? `${props.data.id}?view=collapse`
                  : `${props.data.id}`
              }`}
            >
              <a>
                <h6 className="m-0">{props.data.name}</h6>
              </a>
            </Link>
            <p className="m-0">{props.data.description}</p>

            {props.data.settings && props.data.settings.collapse ? (
              <span className="badge bg-light text-dark">Chat</span>
            ) : (
              <span className="badge bg-light text-dark">Discuss</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelCardView;

// <div className="discussion-card p-3">
// <div className="discussion-card-icon">{props.data.name.substring(0, 1)}</div>
// <Link
//   href={`/channels/${
//     props.data && props.data.settings && props.data.settings.collapse
//       ? `${props.data.id}?view=collapse`
//       : `${props.data.id}`
//   }`}
// >
//   <a className="discussion-card-header">
//     <div className="heading">{props.data.name}</div>
//     <div className="description">{props.data.description}</div>
//   </a>
// </Link>
// {/* <div className="discussion-card-edit-options"></div> */}

// {props.children}
// </div>
