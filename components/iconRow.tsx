import { useState } from "react";
import { CheveronDown } from "@styled-icons/zondicons";
import { CheveronUp } from "@styled-icons/zondicons/CheveronUp";
import { CheckCircleFill } from "@styled-icons/bootstrap/CheckCircleFill";
import { ExclamationCircleFill } from "@styled-icons/bootstrap/ExclamationCircleFill";

const IconRow = (props: any) => {
  const defaultImageUrl = `/bird.svg`;
  const [toggle, setToggle] = useState(false);
  const handle = () => {
    setToggle(!toggle);
  };

  console.log(props.data);

  return (
    <div>
      <div className="row-icons-root-alter">
        {props.data.map((item: any, i: Number) => {
          if (toggle == true || (!toggle && i < 5)) {
            return (
              <div className="row-icons-alter-wrapper">
                <div className="row-icons-alter" title={item.name} key={i.toString()}>
                  {item ? <img src={item.icon} /> : <img src={defaultImageUrl} />}
                  <div className="row-attendance">
                    {props.data.going ? (
                      <CheckCircleFill className="text-success" />
                    ) : (
                      <ExclamationCircleFill className="text-danger" />
                    )}
                  </div>
                </div>
                <div className="row-name">{item.name} </div>
                <div className="row-coins">
                  <div className="row-coin-icon">
                    <img src={"/tutela-coin.png"} />
                  </div>
                  <div className="row-coin-count">
                    {props.data.coins > 0 ? props.data.coins : "0"}
                  </div>
                </div>
              </div>
            );
          }
        })}
        {props.data.length > 5 && (
          <div onClick={handle} className="row-icons-alter-wrapper cursor">
            <div className="row-icons-alter ">
              {toggle ? <CheveronUp width="16px" /> : <CheveronDown width="16px" />}
            </div>
            <div className="row-name">{toggle ? " show less" : "show more"}</div>
          </div>
        )}
      </div>
    </div>
  );
};
export default IconRow;
