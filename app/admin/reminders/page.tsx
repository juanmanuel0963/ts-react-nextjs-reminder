"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
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
        client: z.string({
            required_error: "Client is required",
        }),
        commitment: z.string({
            required_error: "Commitment is required",
        }),
        title: z.string().min(1, {
            message: "Title is required",
        }),
        message: z.string().min(1, {
            message: "Message is required",
        }),
        frequency: z.string({
            required_error: "Frequency is required",
        }),
        days_before: z.string().refine(
            (val) => !Number.isNaN(parseInt(val, 10)) && parseInt(val, 10) >= 0, {
            message: "Days before must be 0 or greater"
        }),
        message_recipients: z.array(z.string()).refine((value) => value.some((item) => item), {
            message: "Select the recipients of the reminder",
        }),
        message_channel: z.array(z.string()).refine((value) => value.some((item) => item), {
            message: "Select the channel for sending the reminder",
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


    const handleSubmit = (data: z.infer<typeof formSchema>) => {

        console.log('Form submitted', { data });

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
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
                                name="client"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel htmlFor="client">Client</FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl id="client">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a Client" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Magda Duarte">Magda Duarte</SelectItem>
                                                    <SelectItem value="Jorge Briceño">Jorge Briceño</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="commitment"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel htmlFor="commitment">Commitment</FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl id="commitment">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a Commitment" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Póliza Auto URS">Póliza Auto URS</SelectItem>
                                                    <SelectItem value="Póliza Salud">Póliza Salud</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
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
                            <FormField
                                control={form.control}
                                name="frequency"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel htmlFor="frequency">Frequency</FormLabel>
                                        <FormControl id="frequency">
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="monthly" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Monthly
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="yearly" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Yearly
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message_recipients"
                                render={() => (
                                    <FormItem>
                                        <div className="mb-4">
                                            <FormLabel htmlFor="message">Recipients</FormLabel>
                                            <FormDescription id="message">

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
                                            <FormLabel htmlFor="message">Message</FormLabel>
                                            <FormDescription id="message">

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
                            <div></div>
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