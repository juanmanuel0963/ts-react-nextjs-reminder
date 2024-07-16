"use server";

import { z } from "zod";
import { getSessionForClient } from "@/lib/actions";
//import { NextRouter } from "next/router";
import { useRouter, useSearchParams } from 'next/navigation';
const formSchema = z.object({
  first_name: z.string().min(1, {
    message: "First name is required",
  }),
  sur_name: z.string().min(1, {
    message: "Sur name is required",
  }),
  country_code: z.string().min(1, {
    message: "Country code is required",
  }),
  phone_number: z.string().min(1, {
    message: "Phone number is required",
  }),
  email: z.string().email(),
});

export const onSubmit = async (
  data: z.infer<typeof formSchema>,
  id: string | null,
  router: any
) => {
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
    ? `https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_clients/${id}`
    : 'https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_clients';
  const method = id ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      body: JSON.stringify(bodyData),
    });

    const response = await res.json();

    if (response.ID > 0) {
      console.log(response.ID);
      alert("Client created/updated successfully.");
      router.push(`./clients-list/`);
    } else {
      console.log(response);
      alert("Client not created/updated. " + response.error);
    }
  } catch (error) {
    alert("Client not created/updated. " + error);
    console.log(error);
  }
};
