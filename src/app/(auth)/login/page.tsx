import { Navbar } from "@/app/components/navbar";
import { Footer } from "@/app/components/footer";
import { Metadata } from "next";

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
                <p className="text-center pt-6 text-[#36485C] lg:text-[18px] lg:leading-7">
                    Login
                </p>
                <form>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" />

                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" />

                    <label htmlFor="channel">Channel</label>
                    <input type="text" id="channel" name="channel" />

                    <button>Submit</button>
                </form>
                <Footer />
            </div>
        </>
    );
}
