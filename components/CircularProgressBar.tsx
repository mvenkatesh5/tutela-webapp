import React from "react";
import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  percent: any;
  width?: number;
  label?: string;
  show_text?: boolean;
  stroke_width?: number;
  text_size?: any;
  color?: string;
  trailColor?: string;
  circleRatio?: number;
  strokeLinecap?: "butt" | "round";
  text_color?: string;
  className?: any;
}

const CircularProgressBar = ({
  percent,
  width,
  label,
  show_text,
  stroke_width,
  text_size = "text-[20px]",
  color = "#52BD94",
  trailColor,
  circleRatio,
  strokeLinecap = "butt",
  className,
}: Props) => {
  return (
    <div style={{ width: width }}>
      <CircularProgressbarWithChildren
        value={percent}
        strokeWidth={stroke_width && stroke_width}
        styles={buildStyles({
          pathColor: color,
          strokeLinecap: strokeLinecap,
          trailColor: trailColor,
        })}
        circleRatio={circleRatio}
      >
        {show_text !== false && <p className={`tw-font-semibold ${text_size}`}>{percent}%</p>}
        {label && <p className={`${text_size ? text_size + " " : ""}tw-capitalize`}>{label}</p>}
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default CircularProgressBar;
