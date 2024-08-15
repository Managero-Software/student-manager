"use server";
import { cookies } from "next/headers";
import { Account, Client, Databases } from "node-appwrite";

const { PROJECT_ID, API_KEY, NEXT_PUBLIC_ENDPOINT, DATABASE_ID } = process.env;

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(NEXT_PUBLIC_ENDPOINT!)
    .setProject(PROJECT_ID!);

  const session = cookies().get("userSession");

  if (session) {
    client.setSession(session.value);
  }
  // console.log("client session ", client);
  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(NEXT_PUBLIC_ENDPOINT!)
    .setProject(PROJECT_ID!)
    .setKey(API_KEY!);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export const databases = async () => {
  const client = new Client()
    .setEndpoint(NEXT_PUBLIC_ENDPOINT!)
    .setProject(PROJECT_ID!)
    .setKey(API_KEY!);

  return await new Databases(client);
};
