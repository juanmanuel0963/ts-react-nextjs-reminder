import { useTheme } from "next-themes";
import Image from "next/image"

export const SideBarLogo=()=>
{
    const { theme } = useTheme();
return <Image width={35} alt="" className="h-10 w-10 mx-3.5 min-h-fit"
height={35} src={theme === 'dark' || theme === 'custom' ? '/Logo.35d46cf7.svg' : '/Logo.35d46cf7.svg'}/>
}