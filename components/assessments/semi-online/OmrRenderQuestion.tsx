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
              style={
                data[optionKey]
                  ? {
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "100px",
                      fontSize: "14px",
                      border: "1px solid green",
                      backgroundColor: "green",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }
                  : {
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "100px",
                      fontSize: "14px",
                      border: "1px solid #ccc",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }
              }
              className={`${
                data[optionKey]
                  ? "border-green-500 bg-green-500 text-white"
                  : "border-gray-300 hover:bg-gray-200"
              }`}
              onClick={() => {
                if (!disabled) handleData(rowKey, questionKey, optionKey, multiple);
              }}
            >
              {String.fromCharCode(IdxOption + "A".charCodeAt(0))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default OmrRenderQuestion;
