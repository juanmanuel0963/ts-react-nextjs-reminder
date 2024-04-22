"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { getSessionForClient } from "@/lib/actions"

const formSchema = z
  .object({
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

export default function Admins() {

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      sur_name: "",
      country_code: "",
      phone_number: "",
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {

    const session = await getSessionForClient()
    const jsonSession = JSON.parse(session)

    let bodyData = {
      firstName: data.first_name,
      surName: data.sur_name,
      email: data.email,
      countryCode: data.country_code,
      phoneNumber: data.phone_number,
      isSuperAdmin: false,
      adminId: jsonSession.adminId
    };

    console.log('Current Admin Id: ', jsonSession.adminId);
    console.log('Is Admin logged in: ', jsonSession.isLoggedIn);
    console.log('Form submitted: ', { data });
    console.log(JSON.stringify(bodyData));

    const res = fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_clients', {
      method: 'POST',
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((data) => {

        // Assuming the data returned includes an indication of successful creation
        if (data.ID > 0) {
          console.log(data.ID);
          alert("Client created successfully.");
          router.push(`./clients-list/`);
        } else {
          // Handle errors
          console.log(data);
          alert("Client not created. " + data.error);
        }
      })
      .catch((error) => {
        // Handle errors
        alert("Client not created. " + error);
        console.log(error);
      });
  };

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight my-4">Create Client</h2>
      <div className="flex-1 space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="first_name">First name</FormLabel>
                    <FormControl>
                      <Input type="text" id="first_name" placeholder="First name" {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sur_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="sur_name">Sur name</FormLabel>
                    <FormControl>
                      <Input type="text" id="sur_name" placeholder="Sur name" {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="country_code">Country code</FormLabel>
                    <FormControl>
                      <Input type="number" id="country_code" placeholder="Country code" {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="phone_number">Phone number</FormLabel>
                    <FormControl>
                      <Input type="number" id="phone_number" placeholder="Phone number" {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor="email">Email address</FormLabel>
                      <FormControl>
                        <Input type="email" id="email" placeholder="Email address" {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div></div>
              <div></div>
            </div>
            <Button type="submit" className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

