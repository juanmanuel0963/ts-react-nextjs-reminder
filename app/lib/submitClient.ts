// lib/submitClient.ts
"use server";

import { getSessionForClient } from "./actions";
import * as z from "zod";

const API_ENDPOINT = 'https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_clients';

export const submitClient = async (data: z.infer<typeof formSchema>, formSchema: z.ZodObject<any, any>, id: string | null, method: string) => {
  const session = await getSessionForClient();
  const jsonSession = JSON.parse(session);

  let bodyData = {
    firstName: data.first_name,
    surName: data.sur_name,
    email: data.email,
    countryCode: data.country_code,
    phoneNumber: data.phone_number,
    isSuperAdmin: false,
    adminId: jsonSession.adminId,
  };

  console.log('Current Admin Id: ', jsonSession.adminId);
  console.log('Is Admin logged in: ', jsonSession.isLoggedIn);
  console.log('Form submitted: ', { data });
  console.log(JSON.stringify(bodyData));

  const url = id
    ? `${API_ENDPOINT}?id=${id}`
    : API_ENDPOINT;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Method': method, // Explicitly mentioning the method for CORS preflight
        'Access-Control-Request-Headers': 'Content-Type' // Explicitly mentioning headers for CORS preflight
      },
      body: JSON.stringify(bodyData),
    });

    const responseData = await response.json();

    if (response.ok) {
      return { success: true, message: id ? "Client updated successfully." : "Client created successfully." };
    } else {
      return { success: false, error: `Client 1 not ${id ? "updated" : "created"}. ${responseData.error}` };
    }
  } catch (error) {
    return { success: false, error: `Client 2 not ${id ? "updated" : "created"}. ${error}` };
  }
};
