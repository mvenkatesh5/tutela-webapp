import React from "react";
// next imports
import Link from "next/link";
// components
import ThreadEditor from "./editor";

const ThreadCardView = (props: any) => {
  const [editorData, setEditorData] = React.useState<any>(false);
  React.useEffect(() => {
    if (props.data)
      setEditorData({
        ...editorData,
        content:
          props.data.data && props.data.data.content
            ? props.data.data.content
            : [
                {
                  type: "paragraph",
                  children: [{ text: "type your content here." }],
                },
              ],
      });
  }, [props.data]);

  return (
    <>
      <div className="thread-card">
        <div className="thread-card-header">
          <Link href={`/channels/${props.channel_id}/${props.data.id}`}>
            <a className="heading">
              {/* {props.data.title} */}
              {editorData && <ThreadEditor data={editorData} edit={false} />}
            </a>
          </Link>
        </div>
        <div className="thread-card-edit-options">{props.children}</div>
      </div>
    </>
  );
};

export default ThreadCardView;
