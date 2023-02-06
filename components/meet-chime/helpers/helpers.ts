export const bindZero = (value: any) => {
  if (value > 9) return value;
  else return `0${value}`;
};

export const timeFormatAmPm = (currentDate: any) => {
  let newDate = new Date(currentDate);
  let hours = bindZero(newDate.getHours());
  let minutes = bindZero(newDate.getMinutes());
  var amPm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${hours}:${minutes} ${amPm}`;
};
