import React from "react";
//components
import OmrRenderQuestion from "./OmrRenderQuestion";

const RenderOmr = ({
  data,
  handleData,
  noOfQuestionInARow,
  multiple = false,
  // user response validation
  disabled = false,
  validity = false,
  userResponse,
}: any) => {
  const [omrData, setOmrData] = React.useState<{ [x: string]: any }>();

  const handleOmrData = (
    rowKey: string,
    questionKey: string,
    optionKey: string,
    multiple: boolean
  ) => {
    let omrObject = { ...omrData };
    Object.keys(omrObject[rowKey][questionKey]).forEach((opKey) => {
      if (multiple) {
        if (opKey === optionKey)
          omrObject[rowKey][questionKey][opKey] = !omrObject[rowKey][questionKey][opKey];
        else omrObject[rowKey][questionKey][opKey] = omrObject[rowKey][questionKey][opKey];
      } else {
        if (opKey === optionKey)
          omrObject[rowKey][questionKey][opKey] = !omrObject[rowKey][questionKey][opKey];
        else omrObject[rowKey][questionKey][opKey] = false;
      }
    });
    setOmrData(omrObject);

    let omrWatchObjectAnswers: any = { ...data?.answer_data };
    omrWatchObjectAnswers[questionKey] = omrObject[rowKey][questionKey];
    handleData("answer_data", omrWatchObjectAnswers);
  };

  React.useEffect(() => {
    if (data && data?.answer_data) {
      let omrList: any = { ...data?.answer_data };
      let omrFinalList: any = {};
      let noOfRows = Math.ceil(parseInt(data?.questions) / noOfQuestionInARow);
      if (data?.questions) {
        for (let i = 0; i < noOfRows; i++) {
          let newObject = {
            [i]: Object.fromEntries(Object.entries(omrList).slice(0, noOfQuestionInARow)),
          };
          Object.assign(omrFinalList, newObject);
          omrList = {
            ...Object.assign(
              {},
              Object.fromEntries(
                Object.entries(omrList).slice(noOfQuestionInARow, Object.keys(omrList).length)
              )
            ),
          };
        }
        setOmrData(omrFinalList);
      }
    }
  }, [data, data?.answer_data, noOfQuestionInARow]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      {omrData && (
        <div
          style={{
            display: "flex",
            gap: "40px",
            width: "100%",
            height: "100%",
            overflow: "auto",
          }}
        >
          {Object.keys(omrData).map((rowKey: string, rowIndex: number) => (
            <div
              key={rowKey}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {Object.keys(omrData[rowKey]).map((questionKey: string, questionIndex: number) => (
                <div key={questionKey}>
                  <OmrRenderQuestion
                    noOfQuestionInARow={noOfQuestionInARow}
                    rowKey={rowKey}
                    rowIndex={rowIndex}
                    questionKey={questionKey}
                    questionIndex={questionIndex}
                    data={omrData[rowKey][questionKey]}
                    handleData={handleOmrData}
                    disabled={disabled}
                    validity={validity}
                    multiple={multiple}
                    userResponse={userResponse}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RenderOmr;
