declare type DayOfWeek = "1" | "2" | "3" | "4" | "5";

declare type Frequency = "Weekly" | "Bi-Weekly(Odd)" | "Bi-Weekly(Even)";

declare interface CreateClass {
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

declare interface ClassInterface extends CreateClass {
  classId: string;
}
