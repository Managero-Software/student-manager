"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { useForm } from "react-hook-form";
import { ClassDialogValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../ui/form";
import {
  createClass,
  getClass,
  updateClass,
} from "@/lib/actions/class.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { SelectItem } from "../ui/select";
import { DayOfWeekOptions, FrequencyOptions } from "@/lib/constants";
import {
  faBook,
  faFlask,
  faPen,
  faSchool,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parseTimeStringToDate } from "@/lib/utils";

const ClassDialog = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof ClassDialogValidation>>({
    resolver: zodResolver(ClassDialogValidation),
    defaultValues: {
      className: "",
      classType: "",
      instructor: "",
      roomNumber: "",
      startTime: new Date(),
      endTime: new Date(new Date().setHours(new Date().getHours() + 1)),
      dayOfWeek: "1",
      frequency: "Weekly",
    },
  });

  useEffect(() => {
    if (isOpen) {
      const fetchClassData = async () => {
        try {
          const classData = await getClass(props.classId);
          if (classData) {
            form.reset({
              className: classData.className,
              classType: classData.classType,
              instructor: classData.instructor,
              roomNumber: classData.roomNumber,
              startTime: new Date(parseTimeStringToDate(classData.startTime)),
              endTime: new Date(parseTimeStringToDate(classData.endTime)),
              dayOfWeek: classData.dayOfWeek,
              frequency: classData.frequency,
            });
          }
        } catch (error) {
          console.error("Failed to fetch class data:", error);
        }
      };

      fetchClassData();
    }
  }, [form, isOpen, props.classId]);

  const onSubmit = async (values: z.infer<typeof ClassDialogValidation>) => {
    try {
      const user = await getLoggedInUser();

      const classData = {
        userId: user ? user.$id : "",
        className: values.className,
        classType: values.classType,
        instructor: values.instructor,
        roomNumber: values.roomNumber,
        startTime: values.startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        endTime: values.endTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        dayOfWeek: values.dayOfWeek,
        frequency: values.frequency,
      };
      if (props.classId) {
        await updateClass(props.classId, classData);
      } else {
        await createClass(classData);
      }
      setIsOpen(false);
      form.reset();
      window.location.reload();
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {props.classId ? (
          <FontAwesomeIcon
            height={24}
            width={24}
            className="hover:text-green-500"
            icon={faPen}
          />
        ) : (
          <Button className="shad-primary-btn">Add Class</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500 px]">
        <Form {...form}>
          <form
            id="classDialog"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8"
          >
            <DialogHeader>
              <DialogTitle>Add Class</DialogTitle>
              <DialogDescription>
                Add a class to the schedule.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-4">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="className"
                placeholder="Class Name"
                iconFa={faBook}
                iconAlt="Class Name"
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="classType"
                placeholder="Class Type"
                iconFa={faFlask}
                iconAlt="Class Type"
              />
            </div>

            <div className="flex gap-4">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="instructor"
                placeholder="Instructor"
                iconFa={faUserTie}
                iconAlt="Instructor"
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="roomNumber"
                placeholder="Room Number"
                iconFa={faSchool}
                iconAlt="Room Number"
              />
            </div>

            <div className="flex gap-4">
              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                dateFormat="HH:mm"
                name="startTime"
                placeholder="Start Time"
              />

              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                dateFormat="HH:mm"
                name="endTime"
                placeholder="End Time"
              />
            </div>

            <div className="flex gap-4">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="dayOfWeek"
                placeholder="Day Of Week"
              >
                {DayOfWeekOptions.map((day, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <p>{day}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>

              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="frequency"
                placeholder="Frequency"
              >
                {FrequencyOptions.map((frequency) => (
                  <SelectItem key={frequency} value={frequency}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <p>{frequency}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
            </div>
            <DialogFooter className="sm:justify-center">
              <DialogClose asChild>
                <Button className="shad-gray-btn">Close</Button>
              </DialogClose>

              <Button type="submit" className="shad-primary-btn">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ClassDialog;
