import { useState } from "react";
import { CheveronDown } from "@styled-icons/zondicons";
import { CheveronUp } from "@styled-icons/zondicons/CheveronUp";

const IconRow = (props: any) => {
  const defaultImageUrl = `/bird.svg`;
  const [toggle, setToggle] = useState(false);
  const handle = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <div className="row-icons-root-alter">
        {props.data.map((item: any, i: Number) => {

          if (toggle == true || (!toggle && i < 5)) {
            return (
              <div className="row-icons-alter-wrapper">
                <div className="row-icons-alter" title={item.name} key={i.toString()}>
                  {item ? <img src={item.icon} /> : <img src={defaultImageUrl} />}
                </div>
                <div className="row-name">{item.name} </div>
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
