import { PageNotFound } from "../(auth)/components/not-found";

export default function NotFound() {
  return (
    <>
      <div className="px-[20px] lg:container lg:px-20 mx-auto">
        {/*<PageNotFound />*/}
        <div className="pt-[80px] pb-[40px]">
            <h3 className="font-medium text-[#0085FF] lg:text-[18px] ">
                Admin. Page not found
            </h3>
            <p className="py-[24px] text-[#36485C] lg:text-[18px]">
                Could not find requested resource
            </p>
        </div>        
      </div>
    </>
  );
}
