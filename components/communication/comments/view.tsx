// components
import CommentCreateView from "@components/communication/comments/create";
import CommentEditView from "@components/communication/comments/edit";

const CommentView = (props: any) => {
  return (
    <>
      <div className="comment-root-wrapper">
        <div className="comment-detail-wrapper">
          {props.data && props.data.length > 0 ? (
            <div className="h-100 border">
              {props.data.map((data: any, index: any) => (
                <div key={`channels-view-${data.id}`} className="mb-2">
                  <CommentEditView
                    data={data}
                    channel_id={props.channel_id}
                    thread_id={props.thread_id}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-5 mb-5">No Comments are available.</div>
          )}
        </div>
        <div className="comment-create-wrapper">
          <CommentCreateView {...props} />
        </div>
      </div>
    </>
  );
};

export default CommentView;
