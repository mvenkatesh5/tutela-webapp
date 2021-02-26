import React from "react";
// components
import { SlateEditor } from "@components/SlateEditor";

const ThreadEditor = (props: any) => {
  const [renderState, setRenderState] = React.useState<any>(false);
  const [editorData, setEditorData] = React.useState<any>();
  const handleEditorData = (key: any, value: any) => {
    setEditorData({ ...editorData, [key]: value });
    props.handleData({ ...editorData, [key]: value });
  };

  React.useEffect(() => {
    if (props.data) {
      setEditorData(props.data);
    }
  }, [props.data]);

  React.useEffect(() => {
    setRenderState(props.edit);
  }, [props.edit]);

  return (
    <div>
      {editorData && editorData.content && (
        <SlateEditor
          readOnly={!renderState}
          initialValue={editorData.content}
          handleData={(value: any) => handleEditorData("content", value)}
        />
      )}
    </div>
  );
};

export default ThreadEditor;
