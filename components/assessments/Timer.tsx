import React from "react";

interface ITimer {
  initialTime: number;
  timeHandler?: () => void;
}

export const secondsToHms = (d: number) => {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  return {
    hours: h,
    minutes: m,
    seconds: s,
  };
};

const Timer: React.FC<ITimer> = ({ initialTime, timeHandler }) => {
  const { hours = 0, minutes = 0, seconds = 60 } = secondsToHms(initialTime);

  const [[hrs, mins, secs], setTime] = React.useState([hours, minutes, seconds]);

  const timeRef = React.useRef<any>();

  const reset = () => {
    clearInterval(timeRef.current);
    if (timeHandler) {
      timeHandler();
    }
  };

  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0) reset();
    else if (mins === 0 && secs === 0) setTime([hrs - 1, 59, 59]);
    else if (secs === 0) setTime([hrs, mins - 1, 59]);
    else setTime([hrs, mins, secs - 1]);
  };

  React.useEffect(() => {
    if (initialTime) timeRef.current = setInterval(() => tick(), 1000);
    return () => clearInterval(timeRef.current);
  }, [hrs, mins, secs]);

  return (
    <span className="tw-ml-1 tw-text-lg tw-font-semibold">
      {!!hrs && <>{hrs.toString().padStart(2, "0")}:</>}
      {mins.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}
    </span>
  );
};

export default Timer;
