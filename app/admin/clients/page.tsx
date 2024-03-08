"use client"
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type FormValues = {
  first_name: string
  sur_name: string
  email: string
  country_code: string
  phone_number: string
};

const schema = z.object({
  first_name: z.string().min(1, "First name is required"),
  sur_name: z.string().min(1, "Sur name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Email format is not valid"),
  country_code: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, {
    message: "Country code must be greater than 0"
  }),
  phone_number: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, {
    message: "Phone number must be greater than 0"
  })
});

export default function Clients() {
  const form = useForm<FormValues>({
    defaultValues: {
      first_name: "",
      sur_name: "",
      email: "",
      country_code: "",
      phone_number: ""
    },
    resolver: zodResolver(schema)
  });

  const { register, control, handleSubmit, formState } = form;

  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted', data);
  };

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight my-4">Create Client</h2>

      <div className="flex-1 space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} noValidate> {/* Validation will be handle by React*/}
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            <div>
              <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
              <input type="text" id="first_name" {...register("first_name")} placeholder="First name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              <p className="mb-2 mt-2 text-sm text-red-600 dark:text-red-500">{errors.first_name?.message}</p>
            </div>
            <div>
              <label htmlFor="sur_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sur name</label>
              <input type="text" id="sur_name" {...register("sur_name")} placeholder="Sur name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              <p className="mb-2 mt-2 text-sm text-red-600 dark:text-red-500">{errors.sur_name?.message}</p>
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="text" id="email" {...register("email")} placeholder="Email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              <p className="mb-2 mt-2 text-sm text-red-600 dark:text-red-500">{errors.email?.message}</p>
            </div>
            <div></div>
            <div>
              <label htmlFor="country_code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country code</label>
              <input type="number" id="country_code" {...register("country_code")} placeholder="Country code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              <p className="mb-2 mt-2 text-sm text-red-600 dark:text-red-500">{errors.country_code?.message}</p>
            </div>
            <div>
              <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
              <input type="number" id="phone_number" {...register("phone_number")} placeholder="Phone number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              <p className="mb-2 mt-2 text-sm text-red-600 dark:text-red-500">{errors.phone_number?.message}</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            <button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Save</button>
          </div>
        </form >
        <DevTool control={control} />
      </div>
    </>
  );
};

