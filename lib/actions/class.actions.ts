"use server";
import { ID, Query } from "node-appwrite";
import { databases } from "../appwrite.config";
import { Class } from "../types/appwrite.types";

const { DATABASE_ID, CLASS_COLLECTION_ID } = process.env;

export const createClass = async ({ ...values }: ClassParams) => {
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
    const listClasses = await (
      await databases()
    ).listDocuments(DATABASE_ID!, CLASS_COLLECTION_ID!, [
      Query.equal("userId", userId),
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

export const updateClass = async (classId: string, classData: ClassParams) => {
  try {
    const listClass = await (
      await databases()
    ).updateDocument(DATABASE_ID!, CLASS_COLLECTION_ID!, classId, classData);

    return listClass;
  } catch (error) {
    console.error("An error occured while tryng to get the Class info.");
  }
};
