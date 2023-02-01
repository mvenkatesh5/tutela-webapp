// axios
import axios from 'axios';

export const createRecordingSession = async (meet_id: string) => {
  const response = await axios
    .post(`/api/recording-session`, {
      params: { meet_id: meet_id },
    })
    .then((res) => res)
    .catch((err) => console.log(err));

  console.log('this is record start session response', response);
  return response?.data;
};

export const stopRecordingSession = async (
  media_pipeline_id: string,
  meet_id: string,
  pipelineArn: string
) => {
  const response = await axios
    .put(`/api/recording-session`, {
      params: {
        pipelineId: media_pipeline_id,
        meet_id: meet_id,
        mediaPipelineArn: pipelineArn,
      },
    })
    .then((res) => res)
    .catch((err) => console.log(err));

  console.log(response);
  return response;
};
