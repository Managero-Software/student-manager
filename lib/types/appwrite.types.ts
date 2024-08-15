import { Models } from "node-appwrite";

export interface Class extends Models.Document {
  className: string;
  classType: string | undefined;
  instructor: string | undefined;
  roomNumber: string | undefined;
  startTime: string;
  endTime: string;
  dayOfWeek: DayOfWeek;
  frequency: Frequency;
  userId: string;
}
