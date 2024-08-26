import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const getHourAndMinute = (date?: Date) => {
  if (date) return date.getHours() + ":" + date.getMinutes();
  else return new Date().getHours() + ":" + new Date().getMinutes();
};

export function parseTimeStringToDate(timeString: string) {
  const [hours, minutes] = timeString.split(":").map(Number);

  const now = new Date();
  now.setHours(hours, minutes, 0, 0);

  return now;
}

export const getDayOfWeek = (date: Date): string => {
  let dayOfWeek = date.getDay();

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return "1";
  }

  return (dayOfWeek - 1).toString();
};
