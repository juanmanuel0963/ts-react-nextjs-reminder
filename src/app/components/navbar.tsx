import Image from "next/image";
import Logo from "../../public/assets/Logo.svg";
import User from "../../public/assets/User.svg";
import Menu from "../../public/assets/Menu.svg";
import Link from 'next/link'
const navLinks = [
  { name: "Features" },
  { name: "Pricing" },
  { name: "Enterprise" },
  { name: "Careers" },
];

export function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between px-[20px] py-[16px] lg:container lg:mx-auto lg:px-20">
      <div className="flex items-center">
        <div className="flex items-center justify-center gap-x-[12px]">
          <Link href="/"><Image src={Logo} alt="Logo" />
          </Link>
          <Link href="/">
            <p className="font-bold text-[#36485C] text-[17px]">Reminderx</p>
          </Link>
        </div>
        <div className="hidden lg:flex pl-[74px] gap-x-[56px]">
          {navLinks.map((item, index) => (
            <p className="text-[#36485C] font-medium" key={index}>
              <Link href="/register">{item.name}</Link>
            </p>
          ))}
        </div>
      </div>

      <div className="flex gap-x-5">
        <p className="hidden lg:block font-medium text-[#36485C] pr-[56px]">
          <Link href="/register">Open an Account</Link>
        </p>

        <div className="flex items-center gap-x-2">
          <Image src={User} alt="User Profile" />
          <span className="hidden font-medium text-[#36485C] lg:block">
            <Link href="/login">Sign in</Link>
          </span>
        </div>

        <Image src={Menu} alt="Menu Button" className="lg:hidden" />
      </div>
    </nav>
  );
}
