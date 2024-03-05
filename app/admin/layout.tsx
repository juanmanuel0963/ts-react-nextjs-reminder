"use client"
import '@/globals.css'
import { ThemeProvider } from './components/theme-provider';
import { SideBar } from './components/sidebar';
import { useSideBarToggle } from './components/hooks/use-sidebar-toggle';
import Header from './components/header';
import classNames from 'classnames';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { toggleCollapse } = useSideBarToggle();
    const bodyStyle = classNames("bg-background flex flex-col mt-16 py-4 p-4 h-full overflow-y-auto",
        {
            ["sm:pl-[21rem]"]: !toggleCollapse,
            ["sm:pl-[6.4rem]"]: toggleCollapse,
        });

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
                    <div className={bodyStyle}>
                        {children}
                    </div>
                </div>
            </>
        </ThemeProvider>
    );
}
