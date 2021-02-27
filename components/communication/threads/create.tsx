import React from "react";
// react bootstrap
import { Button, Form } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import ThreadForm from "./helpers/formRender";
import ThreadEditor from "./helpers/editor";
// api routes
import {
  CHANNEL_WITH_THREAD_ENDPOINT,
  CHANNEL_WITH_THREAD_COLLAPSE_ENDPOINT,
} from "@constants/routes";
// api services
import { ChannelWithThreadCreate } from "@lib/services/communicationService";
import { APIFetcher } from "@lib/services";

const ThreadCreateView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [threadData, setThreadData] = React.useState<any>({
    title: "",
    content: [
      {
        type: "paragraph",
        children: [{ text: " " }],
      },
      {
        type: "paragraph",
        children: [{ text: " " }],
      },
      {
        type: "paragraph",
        children: [{ text: " " }],
      },
    ],
  });
  const handleThreadData = (value: any) => {
    setThreadData(value);
  };

  const channelCreate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    const threadPayload = {
      title: threadData.title,
      data: {
        content: threadData.content,
      },
      channel: props.channel_id,
    };

    ChannelWithThreadCreate(threadPayload)
      .then((res) => {
        if (props.threadView === "collapse") {
          mutate(
            CHANNEL_WITH_THREAD_COLLAPSE_ENDPOINT(props.channel_id),
            APIFetcher(CHANNEL_WITH_THREAD_COLLAPSE_ENDPOINT(props.channel_id)),
            false
          );
        } else
          mutate(
            CHANNEL_WITH_THREAD_ENDPOINT(props.channel_id),
            async (elements: any) => {
              return [...elements, res];
            },
            false
          );
        setButtonLoader(false);
        handleThreadData({
          title: "",
          content: [
            {
              type: "paragraph",
              children: [{ text: " " }],
            },
            {
              type: "paragraph",
              children: [{ text: " " }],
            },
            {
              type: "paragraph",
              children: [{ text: " " }],
            },
          ],
        });
      })
      .catch((errors) => {
        console.log(errors);
        setButtonLoader(false);
      });
  };

  return (
    <div>
      <ThreadEditor data={threadData} handleData={handleThreadData} edit={true} />
      <Button
        variant="outline-primary"
        className="btn-sm mt-2"
        type="submit"
        style={{ marginRight: "10px" }}
        disabled={buttonLoader}
        onClick={channelCreate}
      >
        {buttonLoader ? "Creating Thread..." : "Create Thread"}
      </Button>
    </div>
  );
};

export default ThreadCreateView;
