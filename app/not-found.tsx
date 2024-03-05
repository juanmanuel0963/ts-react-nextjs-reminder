import { Footer } from "./(auth)/components/footer";
import { Navbar } from "./(auth)/components/navbar";
import { PageNotFound } from "./(auth)/components/not-found";

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
