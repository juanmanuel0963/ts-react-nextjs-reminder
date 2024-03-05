import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Karla } from 'next/font/google'
import '../globals.css'
import { ThemeProvider } from '../components/theme-provider';
import { SideBar } from '../components/sidebar';
import Header from '../components/header';
import PageWrapper from '../components/pagewrapper';

const inter = Inter({ subsets: ['latin'] })

const karla = Karla({
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    subsets: ['latin'],
    variable: "--font-karla"
})

export const metadata: Metadata = {
    title: 'Reminderx',
    description: 'Create custom reminders for your important commitments',
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ThemeProvider
            themes={['dark', 'custom', 'light']}
            attribute="class"
            enableSystem
            disableTransitionOnChange
        >
            <>
                <SideBar />
                <div className="flex flex-col h-full w-full">
                    <Header />
                    <PageWrapper children={children} />
                </div>
            </>
        </ThemeProvider>
    );
}
