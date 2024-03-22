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
        password: z.string().min(6),
        password_confirm: z.string(),
    })
    .refine(
        (data) => {
            return data.password === data.password_confirm;
        },
        {
            message: "Passwords do not match",
            path: ["password_confirm"],
        }
    );

export default function Register() {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: "",
            sur_name: "",
            country_code: "",
            phone_number: "",
            email: "",
            password: "",
            password_confirm: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {

        console.log('Form submitted', { data });
        console.log(data.first_name);

        let bodyData = {
            firstName: data.first_name,
            surName: data.sur_name,
            email: data.email,
            password: data.password,
            countryCode: data.country_code,
            phone: data.phone_number,
            isSuperAdmin: false,
            isAdmin: true
        };

        console.log(JSON.stringify(bodyData));

        const res = fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_admins', {
            method: 'POST',
            body: JSON.stringify(bodyData),
        })
            .then((response) => response.json())
            .then((data) => {
                
                console.log(data);
                
                // Assuming the data returned includes an indication of successful creation
                if (data.ID > 0) {
                    console.log(data.ID);
                    alert("Admin created successfully");
                    router.push('/admin');
                }
            })
            .catch((error) => {
                // Handle errors
                alert("Admin not created");
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
                                <p className="text-black">Create your account. It’s free and only take a minute.</p>
                            </div>
                            2                        </div>
                        <div className="w-full lg:w-1/2 py-16 px-12">
                            <h2 className="text-3xl mb-4">Sign up</h2>
                            <div className="flex-1 space-y-4">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
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
                                            <FormField
                                                control={form.control}
                                                name="password_confirm"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem>
                                                            <FormLabel>Password confirm</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Password confirm" type="password" {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    );
                                                }}
                                            />
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
