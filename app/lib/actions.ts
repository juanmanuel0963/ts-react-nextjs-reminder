"use server";

import { sessionOptions, SessionData, defaultSession } from "@/lib/session";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

let username = "john";
let isPro = true;
let isBlocked = true;
/*
export const login = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const session = await getSession();

  const formUsername = formData.get("username") as string;
  const formPassword = formData.get("password") as string;

  // CHECK USER IN THE DB
  // const user = await db.getUser({username,password})

  if (formUsername !== username) {
    return { error: "Wrong Credentials!" };
  }

  session.userId = "1";
  session.username = formUsername;
  session.isPro = isPro;
  session.isLoggedIn = true;

  await session.save();
  redirect("/");
};
*/
//export const getSessionForClient = async () => {

export async function getSessionForClient() {

  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return JSON.stringify(session);
};

export async function saveSession(adminId: string ) {

  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  session.adminId = adminId;
  session.isLoggedIn = true;
    
  await session.save();

}


/*
export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};
*/
/*
export const changePremium = async () => {
  const session = await getSession();

  isPro = !session.isPro;
  session.isPro = isPro;
  await session.save();
  revalidatePath("/profile");
};
*/
/*
export const changeUsername = async (formData: FormData) => {
  const session = await getSession();

  const newUsername = formData.get("username") as string;

  username = newUsername;

  session.username = username;
  await session.save();
  revalidatePath("/profile");
};
*/