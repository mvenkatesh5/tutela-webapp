import React from "react";

const IconStacking = (props: any) => {
  const defaultImageUrl = `/bird.svg`;

  return (
    <div>
      {props.multiple ? (
        <div className="stack-icons-root">
          {props.data.map((item: any, i: Number) => {
            if (i < 5) {
              return (
                <div className="stack-icons">
                  {item ? <img src={item} /> : <img src={defaultImageUrl} />}
                </div>
              );
            }
          })}
          {props.data.length > 5 && (
            <div className="stack-icons">{`+${props.data.length - 5}`}</div>
          )}
        </div>
      ) : (
        <div className="stack-icons-root">
          <div className="stack-icons">
            {props.data ? <img src={props.data} /> : <img src={defaultImageUrl} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconStacking;
