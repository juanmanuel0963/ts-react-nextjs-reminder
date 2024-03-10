"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


import { Checkbox } from "@/components/ui/checkbox"
import {
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectItem,
    Select,
} from "@/components/ui/select";

const send_to_items = [
    {
        id: "client",
        label: "Client",
    },
    {
        id: "admin",
        label: "Admin",
    },
] as const

const formSchema = z
    .object({
        emailAddress: z.string().email(),
        password: z.string().min(3),
        passwordConfirm: z.string(),
        accountType: z.enum(["personal", "company"]),
        companyName: z.string().optional(),
        send_to_items: z.array(z.string()).refine((value) => value.some((item) => item), {
            message: "You have to select at least one item.",
        }),        
    })
    .refine(
        (data) => {
            return data.password === data.passwordConfirm;
        },
        {
            message: "Passwords do not match",
            path: ["passwordConfirm"],
        }
    )
    .refine(
        (data) => {
            if (data.accountType === "company") {
                return !!data.companyName;
            }
            return true;
        },
        {
            message: "Company name is required",
            path: ["companyName"],
        }
    );

export default function Shadcn_Input() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailAddress: "",
            password: "",
            passwordConfirm: "",
            companyName: "",
            send_to_items: [],
        },
    });

    const accountType = form.watch("accountType");

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        console.log({ values });
    };

    return (

        <main >
            <h2 className="text-3xl font-bold tracking-tight my-4">Create Admin</h2>
            <div className="flex-1 space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="emailAddress"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Email address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Email address"
                                                    type="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="accountType"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Account type</FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select an account type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="personal">Personal</SelectItem>
                                                    <SelectItem value="company">Company</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            {accountType === "company" && (
                                <FormField
                                    control={form.control}
                                    name="companyName"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>Company name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Company name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />
                            )}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Password" type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="passwordConfirm"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Password confirm</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Password confirm"
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="send_to_items"
                                render={() => (
                                    <FormItem>
                                        <div className="mb-4">
                                            <FormLabel className="text-base">Send reminder to</FormLabel>
                                            <FormDescription>
                                                Select the recipients of the reminder
                                            </FormDescription>
                                        </div>
                                        {send_to_items.map((item) => (
                                            <FormField
                                                key={item.id}
                                                control={form.control}
                                                name="send_to_items"
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
                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </main>
    );
}