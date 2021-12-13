// cookie
import { getAuthenticationToken } from "@lib/cookie";

export const port = 5000;

export const CRISP_WEBSITE_ID = `4e713b40-b259-401e-b410-19ac90d60b0b`;

export const calendarMonths = [
  { key: "Jan", fullName: "January" },
  { key: "Feb", fullName: "February" },
  { key: "Mar", fullName: "March" },
  { key: "Apr", fullName: "April" },
  { key: "May", fullName: "May" },
  { key: "Jun", fullName: "June" },
  { key: "Jul", fullName: "July" },
  { key: "Aug", fullName: "August" },
  { key: "Sep", fullName: "September" },
  { key: "Oct", fullName: "October" },
  { key: "Nov", fullName: "November" },
  { key: "Dec", fullName: "December" },
];

export const calendarDays = [
  { key: "Sun", fullName: "Sunday" },
  { key: "Mon", fullName: "Monday" },
  { key: "Tue", fullName: "Tuesday" },
  { key: "Wed", fullName: "Wednesday" },
  { key: "Thu", fullName: "Thursday" },
  { key: "Fri", fullName: "Friday" },
  { key: "Sat", fullName: "Saturday" },
];

export const bindZero = (value: any) => {
  if (value > 9) return value;
  else return `0${value}`;
};

export const returnSingleDate = (currentDate: any) => {
  let newDate = new Date(currentDate);
  let date = bindZero(newDate.getDate());
  return `${date}`;
};

export const returnSingleMonth = (currentDate: any) => {
  let newDate = new Date(currentDate);
  let month = newDate.getMonth();
  return `${calendarMonths[month].key}`;
};

export const datePreview = (currentDate: any) => {
  let newDate = new Date(currentDate);
  let date = bindZero(newDate.getDate());
  let month = bindZero(newDate.getMonth() + 1);
  let year = bindZero(newDate.getFullYear());
  let hours = bindZero(newDate.getHours());
  let minutes = bindZero(newDate.getMinutes());
  let seconds = bindZero(newDate.getSeconds());
  return `${date}-${month}-${year}, ${hours}:${minutes}`;
};

export const returnDate = (currentDate: any) => {
  let newDate = new Date(currentDate);
  let date = bindZero(newDate.getDate());
  let month = bindZero(newDate.getMonth() + 1);
  let year = bindZero(newDate.getFullYear());
  return `${date}-${month}-${year}`;
};

export const returnTime = (currentDate: any) => {
  let newDate = new Date(currentDate);
  let hours = bindZero(newDate.getHours());
  let minutes = bindZero(newDate.getMinutes());
  let seconds = bindZero(newDate.getSeconds());
  return `${hours}:${minutes}`;
};

export const getCurrentUser = () => {
  if (getAuthenticationToken()) {
    let details: any = getAuthenticationToken();
    details = details ? JSON.parse(details) : null;
    if (details) {
      return details;
    }
  }
};

export const dateTimeFormat = (currentDate: any) => {
  let newDate = new Date(currentDate);
  let date = bindZero(newDate.getDate());
  let month = bindZero(newDate.getMonth() + 1);
  let year = bindZero(newDate.getFullYear());
  let hours = bindZero(newDate.getHours());
  let minutes = bindZero(newDate.getMinutes());
  return `${year}-${month}-${date}T${hours}:${minutes}`;
};

export const returnDateWithText = (currentDate: any) => {
  let newDate = new Date(currentDate);
  let date = bindZero(newDate.getDate());
  let month = calendarMonths[newDate.getMonth()].fullName;
  let day = calendarDays[newDate.getDay()].fullName;

  return `${day}, ${month} ${date}`;
};

export const secondsToHms = (d: any) => {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h >= 0 ? h + (h == 1 ? " hr, " : " hr, ") : "";
  var mDisplay = m >= 0 ? m + (m == 1 ? " min, " : " min, ") : "";
  var sDisplay = s >= 0 ? s + (s == 1 ? " sec" : " sec") : "";
  return hDisplay + mDisplay + sDisplay;
};
