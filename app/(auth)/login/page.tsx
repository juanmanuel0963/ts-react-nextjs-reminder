"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import Link from 'next/link'
import { saveSession } from "@/lib/actions"

const formSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(6),
    });

export default function Register() {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {

        let rows: never[] = [];

        console.log('Form submitted', { data });

        let bodyData = {
            email: data.email,
            password: data.password,
        };

        console.log(JSON.stringify(bodyData));

        const api = fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_admins_login', {
            method: 'POST',
            body: JSON.stringify(bodyData),
        })
            .then((response) => response.json())
            .then(async (data) => {

                console.log("data");
                console.log(data);

                rows = data;

                console.log("rows 1");
                console.log(rows);                

                // Assuming the data returned includes an indication of successful creation
                if (data.ID > 0) {
                    console.log(data.ID);
                    await saveSession(data.ID)
                    alert("Admin logged in successfully.");
                    router.push(`/admin`);
                } else {
                    // Handle errors
                    console.log(data);
                    alert("Admin not logged in. " + data.error);
                }
            })
            .catch((error) => {
                // Handle errors
                alert("Error loggin in. " + error);
                console.log(error);
            });

    };

    return (
        <>
            <Navbar />
            <div className="px-[20px] lg:container lg:px-20 mx-auto">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto overflow-hidden">
                        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" >
                            <h1 className="text-black text-3xl mb-3">Welcome</h1>
                            <div>
                                <p className="text-black">Introduce your authentication credentials.</p>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 py-16 px-12">
                            <h2 className="text-3xl mb-4">Sign in</h2>
                            <div className="flex-1 space-y-4">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
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
                                            <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem>
                                                            <FormLabel>Password</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Password" type="password" {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                            <div>
                                                <Link className="text-purple-500" href="/forgot-password">Forgot password</Link>
                                            </div>
                                            <div></div>
                                        </div>
                                        <Button type="submit" className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                                            Submit
                                        </Button>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        </>
    );
}
