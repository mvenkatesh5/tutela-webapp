// cookie
import { getAuthenticationToken } from "@lib/cookie";

export const port = 5000;

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

export const datePreview = (currentDate: any) => {
  let newDate = new Date(currentDate);
  let date = bindZero(newDate.getDate());
  let month = bindZero(newDate.getMonth() + 1);
  let year = bindZero(newDate.getFullYear());
  let hours = bindZero(newDate.getHours());
  let minutes = bindZero(newDate.getMinutes());
  let seconds = bindZero(newDate.getSeconds());
  return `${date}-${month}-${year}, ${hours}:${minutes}:${seconds} ${hours > 11 ? "PM" : "AM"}`;
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
  return `${hours}:${minutes} ${hours > 11 ? "PM" : "AM"}`;
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
