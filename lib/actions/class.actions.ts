"use server";
import { ID, Query } from "node-appwrite";
import { databases } from "../appwrite.config";
import { Class } from "../types/appwrite.types";
import { getDayOfWeek } from "../utils";

const { DATABASE_ID, CLASS_COLLECTION_ID } = process.env;

export const createClass = async ({ ...values }: CreateClass) => {
  try {
    const newClass = (await databases()).createDocument(
      DATABASE_ID!,
      CLASS_COLLECTION_ID!,
      ID.unique(),
      { ...values }
    );
    return newClass;
  } catch (error) {
    return error;
  }
};

export const getAllClasses = async (userId: string) => {
  try {
    //test data "August 28, 2024 10:00:00"
    const today: Date = new Date();
    const tomorrow: Date = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const listClasses = await (
      await databases()
    ).listDocuments(DATABASE_ID!, CLASS_COLLECTION_ID!, [
      Query.equal("userId", userId), //clasele sa fie pentru userul curent
      Query.equal("dayOfWeek", [getDayOfWeek(today), getDayOfWeek(tomorrow)]), //doar clasele din ziua de azi si ziua de maine apar
      Query.orderAsc("dayOfWeek"),
      Query.orderAsc("startTime"),
    ]);
    return listClasses.documents as Class[];
  } catch (error) {
    return [];
  }
};

export const getClass = async (classId: string) => {
  try {
    const listClass = await (
      await databases()
    ).getDocument(DATABASE_ID!, CLASS_COLLECTION_ID!, classId);

    return listClass as Class;
  } catch (error) {
    console.error("An error occured while tryng to get the Class info.");
  }
};

export const updateClass = async (classId: string, classData: CreateClass) => {
  try {
    const updatedClass = await (
      await databases()
    ).updateDocument(DATABASE_ID!, CLASS_COLLECTION_ID!, classId, classData);

    return updatedClass;
  } catch (error) {
    console.error("An error occured while tryng to get the Class info.");
  }
};

export const deleteClass = async (classId: string) => {
  try {
    const deletedClass = await (
      await databases()
    ).deleteDocument(DATABASE_ID!, CLASS_COLLECTION_ID!, classId);

    return deletedClass;
  } catch (error) {
    console.error("An error occured while tryng to get the Class info.");
  }
};
