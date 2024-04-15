"use server";

import { sessionOptions, SessionData, defaultSession } from "@/lib/session";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Admin, columns } from "./columns-admin"
import { DataTable } from "@/components/ui/data-table"


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
};
/*
export async function getData(): Promise<Admin[]> {

  // Fetch data from your API here.
  const data = [
    {
      id: "728ed52f",
      first_name: "Juan",
      sur_name: "Diaz",
      email: "juanmanuel0963@gmail.com",
      country_code: "57",
      phone_number: "3209939019"
    },
    {
      id: "598egh7i",
      first_name: "Luz Mery",
      sur_name: "Coronado",
      email: "luzmerycoronado@gmail.com",
      country_code: "57",
      phone_number: "3212408192"
    },
  ];

  return data;
};
*/
/*
export async function getAdmins() : Promise<Admin[]>{
  
  let rows: Admin[];

  const api = fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_admins', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then(async (data) => {

      console.log("data");
      console.log(data);

      rows = data;

      console.log("rows");
      console.log(rows);    

    });

    return rows;
}
*/


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