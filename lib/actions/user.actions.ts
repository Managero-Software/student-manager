"use server";
import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite.config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

export const registerUser = async (user: any) => {
  const { account } = await createAdminClient();
  const newUser = await account.create(
    ID.unique(),
    user.email,
    user.password,
    user.name
  );

  return parseStringify(newUser);
};

export const loginUser = async (user: any) => {
  const { account } = await createAdminClient();
  const session = await account.createEmailPasswordSession(
    user.email,
    user.password
  );

  cookies().set(
    "userSession",
    session.secret
    // , {
    //   path: "/",
    //   httpOnly: true,
    //   sameSite: "strict",
    //   secure: true,
    // } //de setat cand testez productia
  );

  return parseStringify(session ? true : false);
};

export const logoutUser = async () => {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession("current");
    return true;
  } catch (error) {
    return false;
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();

    const user = await account.get();

    return user;
  } catch (error) {
    return null;
  }
}

export async function updateUser({ name }: { name?: string }) {
  try {
    const { account } = await createSessionClient();

    if (name) {
      const user = await account.updateName(name);
      return user;
    }
    const user = await account.get();
    return user;
  } catch (error) {
    return null;
  }
}
