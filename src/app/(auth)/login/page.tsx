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
                <Footer />
            </div>
        </>
    );
}
