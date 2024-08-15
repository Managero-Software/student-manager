declare type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday";

declare type Frequency = "Weekly" | "Bi-Weekly(Odd)" | "Bi-Weekly(Even)";

declare interface ClassParams {
  userId: string;
  className: string;
  classType?: string;
  instructor?: string;
  roomNumber?: string;
  startTime: string;
  endTime: string;
  dayOfWeek: DayOfWeek;
  frequency: Frequency;
}
