"use client"
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type FormValues = {
  event: string
  title: string
  message: string
  days_before: string
  is_yearly: string
  time: string
  send_to_client: string
  send_to_admin: string
  send_sms: string
  send_email: string
  send_whatsapp: string
};

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  days_before: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)) && parseInt(val, 10) >= 0, { message: "Days before must 0 or greater" })
});

export default function Reminders() {
  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      message: "",
      days_before: "",
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
      <h2 className="text-3xl font-bold tracking-tight my-4">Create Reminder</h2>

      <div className="flex-1 space-y-4">
        <form id="myform" onSubmit={handleSubmit(onSubmit)} noValidate> {/* Validation will be handle by React*/}
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
              <input type="text" id="title" {...register("title")} placeholder="Title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              <p className="mb-2 mt-2 text-sm text-red-600 dark:text-red-500">{errors.title?.message}</p>
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
              <input type="text" id="message" {...register("message")} placeholder="Message" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              <p className="mb-2 mt-2 text-sm text-red-600 dark:text-red-500">{errors.message?.message}</p>
            </div>
            <div>
              <label htmlFor="days_before" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Days before</label>
              <input type="number" id="days_before" {...register("days_before")} placeholder="Days before" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              <p className="mb-2 mt-2 text-sm text-red-600 dark:text-red-500">{errors.days_before?.message}</p>
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

