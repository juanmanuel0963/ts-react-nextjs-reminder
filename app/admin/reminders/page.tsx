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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Client, columnsClient } from "@/lib/columns-client"
import { Commitment, columnsCommitment } from "@/lib/columns-commitment"
import React, { useEffect, useState } from 'react';
import { getSessionForClient } from "@/lib/actions"
import { useRouter } from 'next/navigation';

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
const message_channels = [
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
        message_channels: z.array(z.string()).refine((value) => value.some((item) => item), {
            message: "Select the channel for sending the reminder",
        }),
    });

// Async function to fetch data from the API
async function getClients(): Promise<Client[]> {
    try {
        const session = await getSessionForClient()
        const jsonSession = JSON.parse(session)
        const adminId = jsonSession.adminId
        console.log("adminId: ", adminId);

        const response = await fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_clients?adminId=' + adminId, {
            method: 'GET',
        });

        const data = await response.json();
        console.log("API data received:", data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data. " + error);
        return [];
    }
}

// Async function to fetch data from the API
async function getCommitments(): Promise<Commitment[]> {
    try {
        const session = await getSessionForClient()
        const jsonSession = JSON.parse(session)
        const adminId = jsonSession.adminId
        console.log("adminId: ", adminId);

        const response = await fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_commitments?adminId=' + adminId, {
            method: 'GET',
        });

        const data = await response.json();
        console.log("API data received:", data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data. " + error);
        return [];
    }
}

export default function Reminders() {

    const router = useRouter();

    const [resultsClients, setResultsClients] = useState<Client[]>([]);
    const [resultsCommitments, setResultsCommitments] = useState<Commitment[]>([]);

    useEffect(() => {
        async function fetchClients() {
            const clients = await getClients();
            setResultsClients(clients);
        }
        fetchClients();

        async function fetchCommitments() {
            const commitments = await getCommitments();
            setResultsCommitments(commitments);
        }
        fetchCommitments();
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            message: "",
            days_before: "",
            message_recipients: [],
            message_channels: [],
        },
    });

    // Helper function to get the number of days in a month
    const getDaysInMonth = (year: number, month: number): number => {
        return new Date(year, month, 0).getDate();
    };

    /**
 * Function to calculate a new date by subtracting a number of days from the given date.
 * @param year - The year of the initial date.
 * @param month - The month of the initial date (1-12).
 * @param day - The day of the initial date.
 * @param reminderDays - The number of days to count back from the initial date.
 * @returns The new date after subtracting the reminderDays.
 */
    const getReminderDay = (year: number, month: number, day: number, reminderDays: number): { year: number, month: number, day: number } => {
        let newDay = day - reminderDays;
        let newMonth = month;
        let newYear = year;

        while (newDay <= 0) {
            newMonth -= 1;
            if (newMonth <= 0) {
                newMonth = 12;
                newYear -= 1;
            }
            newDay += getDaysInMonth(newYear, newMonth);
        }

        return { year: newYear, month: newMonth, day: newDay };
    };

    const onSubmit = async (formData: z.infer<typeof formSchema>) => {

        const session = await getSessionForClient()
        const jsonSession = JSON.parse(session)
        const adminId = jsonSession.adminId
        const commitmentId = Number(formData.commitment)

        console.log('Form submitted: ', { formData });
        console.log('Current Admin Id: ', adminId);
        console.log('Is Admin logged in: ', jsonSession.isLoggedIn);
        console.log('Current Commitment Id: ', commitmentId);

        //--------------------------------------- Query rmdx_commitments------------------------------

        console.log("-------rmdx_commitments-------");

        let responseDataCommitments = null;

        try {

            const responseCommitments = await fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_commitments?adminId=' + adminId + '&commitmentId=' + commitmentId, {
                method: 'GET',
            });

            responseDataCommitments = await responseCommitments.json();

            // Assuming the data returned includes an indication of successful creation
            if (responseDataCommitments) {
                console.log("Query commitment data: ");
                console.log(responseDataCommitments[0]);
                console.log(responseDataCommitments[0].commitment);
                console.log(responseDataCommitments[0].ClientID);
                console.log(responseDataCommitments[0].date);
            }

            console.log(formData.message_recipients);

            let clientSchedule = "";
            let adminSchedule = "";


            //Iterate the recipients list
            for (let i = 0; i < formData.message_recipients.length; i++) {

                console.log("Recipients: ");
                console.log(formData.message_recipients[i]);

                // Extract the date string
                const dateString = responseDataCommitments[0].date;

                // Split the date string to get the year, month, and day
                const [year, month, day] = dateString.split('T')[0].split('-');

                // Log the extracted values
                console.log(`Year: ${year}, Month: ${month}, Day: ${day}`);

                // Convert year to a number
                const yearNumber = parseInt(year, 10); // or use Number(year)
                console.log(`Year: ${yearNumber}`);

                // Convert day to a number
                const dayNumber = parseInt(day, 10); // or use Number(day)
                console.log(`Day: ${dayNumber}`);

                // Convert month to a number
                const monthNumber = parseInt(month, 10); // or use Number(month)
                console.log(`Month: ${monthNumber}`);

                // Call the getDaysInMonth function
                const daysInMonth = getDaysInMonth(yearNumber, monthNumber);
                console.log(`Days in Month: ${daysInMonth}`);

                const daysBefore = Number(formData.days_before);
                console.log("daysBefore: " + daysBefore);

                // Get the new reminder day
                const reminderDate = getReminderDay(yearNumber, monthNumber, dayNumber, daysBefore);
                console.log(`Reminder Date: Year: ${reminderDate.year}, Month: ${reminderDate.month}, Day: ${reminderDate.day}`);

                let bodyDataScheduler = null;

                if (formData.message_recipients[i] == "client") {
                    bodyDataScheduler = {
                        id: String(formData.commitment),
                        name: responseDataCommitments[0].clientFirstName + " " + responseDataCommitments[0].clientSurName,
                        email: responseDataCommitments[0].clientEmail,
                        phone: "+" + responseDataCommitments[0].clientCountryCode + responseDataCommitments[0].clientPhoneNumber,
                        title: formData.title,
                        message: formData.message,
                        reminder_day: `${(reminderDate.day)}`,
                        reminder_hour: "9",
                        reminder_minute: "00"
                    };
                } else if (formData.message_recipients[i] == "admin") {
                    bodyDataScheduler = {
                        id: String(formData.commitment),
                        name: responseDataCommitments[0].adminFirstName + " " + responseDataCommitments[0].adminSurName,
                        email: responseDataCommitments[0].adminEmail,
                        phone: "+" + responseDataCommitments[0].adminCountryCode + responseDataCommitments[0].adminPhoneNumber,
                        title: formData.title,
                        message: formData.message,
                        reminder_day: `${(reminderDate.day)}`,
                        reminder_hour: "9",
                        reminder_minute: "00"
                    };
                };

                console.log(JSON.stringify(bodyDataScheduler));

                const responseScheduler = await fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_scheduler', {
                    method: 'POST',
                    body: JSON.stringify(bodyDataScheduler),
                });

                let responseDataScheduler = null;

                responseDataScheduler = await responseScheduler.json();

                // Assuming the data returned includes an indication of successful creation
                if (responseDataScheduler) {
                    console.log("Scheduler data: ");
                    console.log(responseDataScheduler);
                    console.log(responseDataScheduler.schedule_id);
                };

                if (formData.message_recipients[i] == "client") {
                    clientSchedule = responseDataScheduler.schedule_id
                };

                if (formData.message_recipients[i] == "admin") {
                    adminSchedule = responseDataScheduler.schedule_id
                };
            };

            let bodyDataReminder = {
                clientId: Number(formData.client),
                commitmentId: Number(formData.commitment),
                daysBefore: Number(formData.days_before),
                frequency: formData.frequency,
                title: formData.title,
                message: formData.message,
                channels: String(formData.message_channels),
                recipients: String(formData.message_recipients),
                clientSchedule: clientSchedule,
                adminSchedule: adminSchedule
            };

            console.log("bodyDataReminder");
            console.log(JSON.stringify(bodyDataReminder));

            const responseReminder = await fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_reminders', {
                method: 'POST',
                body: JSON.stringify(bodyDataReminder),
            });

            let responseDataReminders = null;

            responseDataReminders = await responseReminder.json();

            // Assuming the data returned includes an indication of successful creation
            if (responseDataReminders) {
                console.log("Reminder created: ");
                console.log(responseDataReminders);
            };


        } catch (error) {
            // Handle errors
            alert("Error. " + error);
            console.log("Error. " + error);
        };


        /*
                
                        const responseCommitments2 = await fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_commitments?adminId=' + adminId + '&commitmentId=' + commitmentId, {
                            method: 'GET',
                        })
                            .then((response) => response.json())
                            .then((responseDataCommitments) => {
                
                                // Assuming the data returned includes an indication of successful creation
                                if (responseDataCommitments) {
                                    console.log("Commitment data: ");
                                    console.log(responseDataCommitments[0]);
                                    console.log(responseDataCommitments[0].commitment);
                                    console.log(responseDataCommitments[0].ClientID);
                                    console.log(responseDataCommitments[0].date);
                
                                    // Extract the date string
                                    const dateString = responseDataCommitments[0].date;
                
                                    // Split the date string to get the year, month, and day
                                    const [year, month, day] = dateString.split('T')[0].split('-');
                
                                    // Log the extracted values
                                    console.log(`Year: ${year}, Month: ${month}, Day: ${day}`);
                
                                    // Convert year to a number
                                    const yearNumber = parseInt(year, 10); // or use Number(year)
                                    console.log(`Year: ${yearNumber}`);
                
                                    // Convert day to a number
                                    const dayNumber = parseInt(day, 10); // or use Number(day)
                                    console.log(`Day: ${dayNumber}`);
                
                                    // Convert month to a number
                                    const monthNumber = parseInt(month, 10); // or use Number(month)
                                    console.log(`Month: ${monthNumber}`);
                
                                    // Call the getDaysInMonth function
                                    const daysInMonth = getDaysInMonth(yearNumber, monthNumber);
                                    console.log(`Days in Month: ${daysInMonth}`);
                
                                    const daysBefore = Number(formData.days_before);
                                    console.log("daysBefore: " + daysBefore);
                
                                    // Get the new reminder day
                                    const reminderDate = getReminderDay(yearNumber, monthNumber, dayNumber, daysBefore);
                                    console.log(`Reminder Date: Year: ${reminderDate.year}, Month: ${reminderDate.month}, Day: ${reminderDate.day}`);
                
                
                                    //---------------------------------------rmdx_scheduler------------------------------
                
                                    console.log("-------rmdx_scheduler-------");
                
                                    let bodyDataScheduler = {
                                        id: String(formData.commitment),
                                        name: responseDataCommitments[0].clientFirstName + responseDataCommitments[0].clientSurName,
                                        email: responseDataCommitments[0].clientEmail,
                                        phone: "+" + responseDataCommitments[0].clientCountryCode + responseDataCommitments[0].clientPhoneNumber,
                                        title: formData.title,
                                        message: formData.message,
                                        reminder_day: `${(reminderDate.day)}`,
                                        reminder_hour: "9",
                                        reminder_minute: "00"
                                    };
                
                                    console.log(JSON.stringify(bodyDataScheduler));
                
                                    const responseScheduler = fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_scheduler', {
                                        method: 'POST',
                                        body: JSON.stringify(bodyDataScheduler),
                                    })
                                        .then((response) => response.json())
                                        .then((responseDataScheduler) => {
                
                                            // Assuming the data returned includes an indication of successful creation
                                            if (responseDataScheduler) {
                                                console.log("Scheduler data: ");
                                                console.log(responseDataScheduler);
                
                                                //---------------------------------------rmdx_reminders------------------------------
                
                                                console.log("-------rmdx_reminders-------");
                
                                                let bodyDataReminder = {
                                                    clientId: Number(formData.client),
                                                    commitmentId: Number(formData.commitment),
                                                    days_before: Number(formData.days_before),
                                                    frequency: formData.frequency,
                                                    title: formData.title,
                                                    message: formData.message,
                                                    channels: String(formData.message_channels),
                                                    recipients: String(formData.message_recipients),
                                                    schedule_id_client: responseDataScheduler.schedule_id
                                                };
                
                                                console.log(JSON.stringify(bodyDataReminder));
                
                                                const responseReminder = fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_reminders', {
                                                    method: 'POST',
                                                    body: JSON.stringify(bodyDataReminder),
                                                })
                                                    .then((response) => response.json())
                                                    .then((responseDataReminders) => {
                
                                                        // Assuming the data returned includes an indication of successful creation
                                                        if (responseDataReminders.ID > 0) {
                                                            console.log(responseDataReminders.ID);
                                                            alert("Reminder created successfully.");
                                                            //router.push(`./reminders-list/`);
                                                        } else {
                                                            // Handle errors
                                                            console.log(responseDataReminders);
                                                            alert("Reminder not created. " + responseDataReminders.error);
                                                        }
                                                    })
                                                    .catch((error) => {
                                                        // Handle errors
                                                        alert("Reminder not created. " + error);
                                                        console.log(error);
                                                    });
                
                                                //end ---------------------------------------rmdx_reminders------------------------------
                
                                            } else {
                                                // Handle errors
                                                console.log(responseDataScheduler);
                                                alert("Scheduler not created. " + responseDataScheduler.error);
                                            }
                                        })
                                        .catch((error) => {
                                            // Handle errors
                                            alert("Scheduler not created. " + error);
                                            console.log(error);
                                        });
                
                                    //end ---------------------------------------rmdx_scheduler------------------------------
                
                                } else {
                                    // Handle errors
                                    console.log(responseDataCommitments);
                                    alert("Commitment does not exist. " + responseDataCommitments.error);
                                }
                            })
                            .catch((error) => {
                                // Handle errors
                                alert("Commitment does not exist. " + error);
                                console.log(error);
                            });
                        //end ---------------------------------------rmdx_commitments------------------------------
                        */
    };

    return (
        <main >
            <h2 className="text-3xl font-bold tracking-tight my-4">Create Reminder</h2>
            <div className="flex-1 space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="client"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel htmlFor="client">Client</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl id="client">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a Client" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {resultsClients.map(client => (
                                                            <SelectItem key={client.ID} value={String(client.ID)}>
                                                                {client.firstName + ' ' + client.surName}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
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
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl id="commitment">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a Commitment" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {resultsCommitments.map(commitment => (
                                                            <SelectItem key={commitment.ID} value={String(commitment.ID)}>
                                                                {commitment.commitment}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
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
                                name="message_channels"
                                render={() => (
                                    <FormItem>
                                        <div className="mb-4">
                                            <FormLabel htmlFor="message">Channel</FormLabel>
                                            <FormDescription id="message">

                                            </FormDescription>
                                        </div>
                                        {message_channels.map((item) => (
                                            <FormField
                                                key={item.id}
                                                control={form.control}
                                                name="message_channels"
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