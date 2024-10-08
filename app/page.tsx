import { Footer } from "./(auth)/components/footer";
import { Navbar } from "./(auth)/components/navbar";
import Layout from './layout'

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
