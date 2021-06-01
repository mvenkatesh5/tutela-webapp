import { useReducer, useEffect } from "react";
// global imports
import { secondsToHms, returnDateWithText, returnTime } from "@constants/global";

const SessionTimer = (props: any) => {
  let timerVariable: any;
  let closeTimer: any = 10 * 60;

  const validateTodayDate = () => {
    const today: any = new Date();
    const currentDate: any = new Date(props.date);
    if (
      today.getDate() === currentDate.getDate() &&
      today.getMonth() === currentDate.getMonth() &&
      today.getYear() === currentDate.getYear()
    ) {
      return true;
    }
    return false;
  };

  const [timer, setTimer] = useReducer((timerOption: any, { type, value }: any) => {
    switch (type) {
      case "add":
        return value;
      case "update":
        let updateTimer: any = parseInt(timerOption);
        updateTimer = updateTimer - 1;
        return updateTimer;
      case "initialAdd":
        return value;
      default:
        return timerOption;
    }
  }, null);

  function startTimer() {
    timerVariable = setInterval(countDown, 1000);
  }

  const countDown = () => {
    setTimer({ type: "update", value: 0 });
    if (timer + 1 == closeTimer) {
      clearInterval(timerVariable);
    }
  };

  useEffect(() => {
    if (props.time > closeTimer) {
      setTimer({ type: "initialAdd", value: props.time - closeTimer });
      startTimer();
    }
    return () => clearInterval(timerVariable);
  }, [props.time]);

  return (
    <div>
      {validateTodayDate() ? (
        <div>
          {timer && timer >= 0 ? (
            <small>
              <div className="text-primary" style={{ margin: 0, color: "blue" }}>
                The session will begin in {secondsToHms(timer)}
              </div>
            </small>
          ) : (
            <div>{props.children}</div>
          )}
        </div>
      ) : (
        <small>
          <div className="text-success" style={{ margin: 0 }}>
            The session will begin on {returnDateWithText(props.date)}, {returnTime(props.date)}
          </div>
        </small>
      )}
    </div>
  );
};

export default SessionTimer;
