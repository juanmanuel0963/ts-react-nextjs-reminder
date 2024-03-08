"use client"
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type FormValues = {
  client_name: string
  event_name: string
  date: string
};

const schema = z.object({
  client_name: z.string().min(1, "Client name is required"),
  event_name: z.string().min(1, "Event name is required"),
  date: z.string().min(1, "Date is required")
});

export default function Events() {
  const form = useForm<FormValues>({
    defaultValues: {
      client_name: "",
      event_name: "",
      date: "",
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
      <h2 className="text-3xl font-bold tracking-tight my-4">Create Event</h2>

      <div className="flex-1 space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} noValidate> {/* Validation will be handle by React*/}
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            <div>
              <label htmlFor="client_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client name</label>
              <input type="text" id="client_name" {...register("client_name")} placeholder="Client name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              <p className="mb-2 mt-2 text-sm text-red-600 dark:text-red-500">{errors.client_name?.message}</p>
            </div>
            <div>
              <label htmlFor="event_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event name</label>
              <input type="text" id="event_name" {...register("event_name")} placeholder="Event name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              <p className="mb-2 mt-2 text-sm text-red-600 dark:text-red-500">{errors.event_name?.message}</p>
            </div>
            <div>
              <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
              <input type="text" id="date" {...register("date")} placeholder="Date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              <p className="mb-2 mt-2 text-sm text-red-600 dark:text-red-500">{errors.date?.message}</p>
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

