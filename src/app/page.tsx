import { Footer } from "@/app/components/footer";
import { Navbar } from "@/app/components/navbar";
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="px-[20px] lg:container lg:px-20 mx-auto">
        <p className="text-center pt-6 text-[#36485C] lg:text-[18px] lg:leading-7">
          Home
        </p>
        <Footer />
      </div>
    </>
  );
}
