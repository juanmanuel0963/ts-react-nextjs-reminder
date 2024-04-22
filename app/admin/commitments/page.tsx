//https://github.com/shadcn-ui/ui/issues/868 example
"use client"
import * as z from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Client, columns } from "@/lib/columns-client"
import React, { useEffect, useState } from 'react';
import { getSessionForClient } from "@/lib/actions"
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    client: z.string({
        required_error: "Client is required",
    }),
    commitment: z.string().min(1, {
        message: "Commitment is required",
    }),
    date: z.date({
        required_error: "Date is required",
    }),
});

const getClients = async (): Promise<Client[]> => {
    try {
        const response = await fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_clients', {
            method: 'GET',
        });
        const data = await response.json();
        console.log("Data fetched: ", data);
        return data;
    } catch (error) {
        console.error("Error fetching clients: ", error);
        alert("Error fetching clients: " + error);
        return [];
    }
};

export default function Commitments() {

    const router = useRouter();

    const [results, setResults] = useState<Client[]>([]);

    useEffect(() => {
        async function fetchClients() {
            const clients = await getClients();
            setResults(clients);
        }

        fetchClients();
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            commitment: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        
        console.log('Form submitted', { data });

        const session = await getSessionForClient()
        const jsonSession = JSON.parse(session)
    
        let bodyData = {
          clientId: Number(data.client),
          commitment: data.commitment,
          date: data.date
        };        

        console.log(JSON.stringify(bodyData));

        const res = fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_commitments', {
            method: 'POST',
            body: JSON.stringify(bodyData),
          })
            .then((response) => response.json())
            .then((data) => {
      
              // Assuming the data returned includes an indication of successful creation
              if (data.ID > 0) {
                console.log(data.ID);
                alert("Commitment created successfully.");
                router.push(`./commitments-list/`);
              } else {
                // Handle errors
                console.log(data);
                alert("Commitment not created. " + data.error);
              }
            })
            .catch((error) => {
              // Handle errors
              console.log(error);
              alert("Commitment not created. " + error);            
            });        
    };

    return (
        <main>
            <h2 className="text-3xl font-bold tracking-tight my-4">Create Commitment</h2>
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
                                                        {results.map(client => (
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
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="commitment">Commitment</FormLabel>
                                        <FormControl>
                                            <Input type="text" id="commitment" placeholder="Commitment" {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" />
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel htmlFor="date">Date</FormLabel><br></br>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl id="date">
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div></div>
                            <div></div>
                        </div>
                        <Button type="submit" className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                            Save
                        </Button>
                    </form>
                </Form>
            </div>
        </main >
    );
}
