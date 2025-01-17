import React from "react";
import { Image } from "react-bootstrap";

const IconStacking = (props: any) => {
  const defaultImageUrl = `/bird.svg`;

  return (
    <div>
      {props.multiple ? (
        <div className="stack-icons-root">
          {props.data.map((item: any, i: Number) => {
            if (i < 5) {
              return (
                <div className="stack-icons" title={item.name} key={i.toString()}>
                  {item ? <Image alt="" src={item.icon} /> : <Image alt="" src={defaultImageUrl} />}
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
            {props.data ? (
              <Image alt="" src={props.data} />
            ) : (
              <Image alt="" src={defaultImageUrl} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconStacking;
