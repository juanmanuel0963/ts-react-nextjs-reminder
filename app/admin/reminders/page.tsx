"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectItem,
    Select,
} from "@/components/ui/select";
const message_recipients = [
    {
        id: "client",
        label: "Client",
    },
    {
        id: "admin",
        label: "Admin",
    },
] as const;
const message_channel = [
    {
        id: "sms",
        label: "SMS",
    },
    {
        id: "email",
        label: "Email",
    },
    {
        id: "whatsapp",
        label: "Whatsapp",
    },
] as const;
const formSchema = z
    .object({
        title: z.string().min(1, {
            message: "Title is required",
        }),
        message: z.string().min(1, {
            message: "Message is required",
        }),
        days_before: z.string().refine(
            (val) => !Number.isNaN(parseInt(val, 10)) && parseInt(val, 10) >= 0, {
            message: "Days before must 0 or greater"
        }),
        message_recipients: z.array(z.string()).refine((value) => value.some((item) => item), {
            message: "You have to select the recipient of the message",
        }),
        message_channel: z.array(z.string()).refine((value) => value.some((item) => item), {
            message: "You have to select the message channel",
        }),

    });

export default function Reminders() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            message: "",
            days_before: "",
            message_recipients: [],
            message_channel: [],
        },
    });

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        console.log({ values });
    };

    return (

        <main >
            <h2 className="text-3xl font-bold tracking-tight my-4">Create Reminder</h2>
            <div className="flex-1 space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="title">Title</FormLabel>
                                        <FormControl>
                                            <Input type="text" id="title" placeholder="Title" {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" />
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="message">Message</FormLabel>
                                        <FormControl>
                                            <Input type="text" id="message" placeholder="Message" {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" />
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="days_before"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="days_before">Days before</FormLabel>
                                        <FormControl>
                                            <Input type="number" id="days_before" placeholder="Days before" {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" />
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            />
                            <div>
                                
                            </div>
                            <FormField
                                control={form.control}
                                name="message_recipients"
                                render={() => (
                                    <FormItem>
                                        <div className="mb-4">
                                            <FormLabel htmlFor="message">Send reminder to</FormLabel>
                                            <FormDescription id="message">
                                                Select the recipients of the reminder
                                            </FormDescription>
                                        </div>
                                        {message_recipients.map((item) => (
                                            <FormField
                                                key={item.id}
                                                control={form.control}
                                                name="message_recipients"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={item.id}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(item.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, item.id])
                                                                            : field.onChange(
                                                                                field.value?.filter(
                                                                                    (value) => value !== item.id
                                                                                )
                                                                            )
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal">
                                                                {item.label}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        ))}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message_channel"
                                render={() => (
                                    <FormItem>
                                        <div className="mb-4">
                                            <FormLabel htmlFor="message">Message channel</FormLabel>
                                            <FormDescription id="message">
                                                Select the channel for sending the reminder
                                            </FormDescription>
                                        </div>
                                        {message_channel.map((item) => (
                                            <FormField
                                                key={item.id}
                                                control={form.control}
                                                name="message_channel"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={item.id}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(item.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, item.id])
                                                                            : field.onChange(
                                                                                field.value?.filter(
                                                                                    (value) => value !== item.id
                                                                                )
                                                                            )
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal">
                                                                {item.label}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        ))}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />                            
                        </div>
                        <Button type="submit" className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                            Save
                        </Button>
                    </form>
                </Form>
            </div>
        </main>
    );
}