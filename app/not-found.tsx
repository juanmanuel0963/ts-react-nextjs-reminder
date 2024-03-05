import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { PageNotFound } from "./components/not-found";

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
