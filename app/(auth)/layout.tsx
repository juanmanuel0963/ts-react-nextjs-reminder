import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Reminderx',
    description: 'Create custom reminders for your important commitments',
}

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}
