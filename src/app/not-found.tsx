import { Footer } from "@/app/components/footer";
import { Navbar } from "@/app/components/navbar";
import { PageNotFound } from "@/app/components/not-found";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="px-[20px] lg:container lg:px-20 mx-auto">
        <PageNotFound />
        <Footer />
      </div>
    </>
  );
}
