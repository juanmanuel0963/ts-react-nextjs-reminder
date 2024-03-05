import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/theme-provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Reminderx',
  description: 'Create custom reminders for your important commitments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
