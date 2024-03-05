import Image from "next/image";
import Logo from "../../public/assets/Logo.svg";
import Facebook from "../../public/assets/Facebook.svg";
import Twitter from "../../public/assets/X.svg";
import Feed from "../../public/assets/Feed.svg";
import Link from 'next/link'
const navLinks = [
  { name: "Features" },
  { name: "Pricing" },
  { name: "Enterprise" },
  { name: "Careers" },
];

export function Footer() {
  return (
    <div className="pt-[80px] pb-[40px]">
      <div className="flex items-center justify-center gap-x-[12px]">

        <Link href="/"><Image src={Logo} alt="Logo" />
        </Link>
        <Link href="/">
          <p className="font-bold text-[#36485C] text-[17px]">Reminder-X</p>
        </Link>


      </div>

      <ul className="flex flex-col items-center gap-y-[32px] pt-[56px] text-[#36485C] sm:flex-row sm:justify-center sm:gap-x-5 sm:pt-5">
        <li><Link href="/login">Features</Link></li>
        <li><Link href="/login">Pricing</Link></li>
        <li><Link href="/login">Enterprise</Link></li>
        <li><Link href="/login">Careers</Link></li>
      </ul>
      <p className="pt-[56px] text-center text-[14px] font-medium text-[#5F7896] sm:pt-5">
        © Copyright 2024. Reminder-X. All rights reserved.
      </p>

      <div className="flex items-center justify-center gap-x-[56px] pt-[40px]">
        <Image src={Facebook} alt="Facebook" />
        <Image src={Feed} alt="Feed" />
        <Image src={Twitter} alt="Twitter" />
      </div>
    </div>
  );
}
