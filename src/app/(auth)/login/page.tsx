import { Navbar } from "@/app/components/navbar";
import { Footer } from "@/app/components/footer";
import { Metadata } from "next";
import Link from 'next/link'
export const metadata: Metadata = {
    title: {
        absolute: "Login",
    },
};

export default function Login() {
    return (
        <>
            <Navbar />
            <div className="px-[20px] lg:container lg:px-20 mx-auto">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto overflow-hidden">
                        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" >
                            <h1 className="text-black text-3xl mb-3">Welcome</h1>
                            <div>
                                <p className="text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean suspendisse aliquam varius rutrum purus maecenas ac <a href="#" className="text-purple-500 font-semibold">Learn more</a></p>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 py-16 px-12">
                            <h2 className="text-3xl mb-4">Sign in</h2>
                            <p className="mb-4">
                                Introduce your authentication credentials
                            </p>
                            <form action="#">
                                <div className="mt-5">
                                    <input type="text" placeholder="Email" className="border border-gray-400 py-1 px-2 w-full" />
                                </div>
                                <div className="mt-5">
                                    <input type="password" placeholder="Password" className="border border-gray-400 py-1 px-2 w-full" />
                                </div>
                                <div className="mt-5">
                                    <input type="password" placeholder="Confirm Password" className="border border-gray-400 py-1 px-2 w-full" />
                                </div>
                                <div className="mt-5">
                                    <span>
                                        <Link className="text-purple-500 font-semibold" href="/forgot-password">Forgot password</Link>
                                    </span>
                                </div>
                                <div className="mt-5">
                                    <button className="w-full bg-purple-500 py-3 text-center text-white">Sign in</button>
                                </div>
                            </form >
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        </>
    );
}
