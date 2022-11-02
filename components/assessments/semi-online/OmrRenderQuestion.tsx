const OmrRenderQuestion = ({
  noOfQuestionInARow,
  rowKey,
  rowIndex,
  questionKey,
  questionIndex,
  data,
  handleData,
  disabled = false,
  multiple = false,
  validity = false,
  userResponse,
}: any) => {
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          fontSize: "14px",
          fontWeight: "bold",
          minWidth: "22px",
        }}
      >
        {rowIndex > 0 ? rowIndex * noOfQuestionInARow + questionIndex + 1 : questionIndex + 1}.
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "10px" }}>
        {data &&
          Object.keys(data).length > 0 &&
          Object.keys(data).map((optionKey: string, IdxOption: number) => (
            <div
              key={optionKey}
              // style={
              //   data[optionKey]
              //     ? {
              //         width: "24px",
              //         height: "24px",
              //         display: "flex",
              //         justifyContent: "center",
              //         alignItems: "center",
              //         borderRadius: "100px",
              //         fontSize: "14px",
              //         cursor: "pointer",
              //         fontWeight: "bold",
              //         border: "1px solid green",
              //         backgroundColor: "green",
              //         color: "white",
              //       }
              //     : {
              //         width: "24px",
              //         height: "24px",
              //         display: "flex",
              //         justifyContent: "center",
              //         alignItems: "center",
              //         borderRadius: "100px",
              //         fontSize: "14px",
              //         cursor: "pointer",
              //         fontWeight: "bold",
              //         border: "1px solid #ccc",
              //       }
              // }
              className={`omr-default-styling ${
                validity
                  ? userResponse?.data[questionKey]?.is_user_answered
                    ? userResponse?.data[questionKey]?.is_correct &&
                      userResponse?.data[questionKey]?.user_answers.includes(optionKey)
                      ? `green `
                      : userResponse?.data[questionKey]?.answers.includes(optionKey)
                      ? `blue `
                      : userResponse?.data[questionKey]?.user_answers.includes(optionKey)
                      ? `red `
                      : ``
                    : userResponse?.data[questionKey]?.answers.includes(optionKey)
                    ? `blue `
                    : ``
                  : data[optionKey]
                  ? `green `
                  : `border-gray-300 hover:bg-gray-200`
              }`}
              onClick={() => {
                if (!disabled) handleData(rowKey, questionKey, optionKey, multiple);
              }}
            >
              {console.log(optionKey)}
              {String.fromCharCode(IdxOption + "A".charCodeAt(0))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default OmrRenderQuestion;
