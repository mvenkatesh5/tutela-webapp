// axios
import axios from 'axios';

export const mergeArtifacts = async (
  chunk_dest: string,
  pipelineArn: string
) => {
  const response = await axios
    .post(`/api/artifact-merge-pipeline`, {
      params: { chunk_dest: chunk_dest, pipelineArn: pipelineArn },
    })
    .then((res) => res)
    .catch((e) => e);
  console.log(response);
  return response;
};
