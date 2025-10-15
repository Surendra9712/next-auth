"use client"
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {UserButton} from "@/components/auth/user-button";

export const Navbar = () => {
    const pathname = usePathname();
    const navItems = [
        {
            label: "Settings",
            link: "/settings"
        },
        {
            label: "Server",
            link: "/server"
        },
        {
            label: "Client",
            link: "/client"
        },
        {
            label: "Admin",
            link: "/admin"
        }
    ]
    return (<>
        <div
            className="bg-secondary flex justify-between items-center p-4 rounded-xl shadow-sm  max-w-4xl w-full sticky top-0">
            <div className="flex gap-x-2">
                {navItems.map((item, index) => (
                    <Button key={item.link} asChild variant={pathname === item.link ? "default" : "link"}>
                        <Link href={item.link}>{item.label}</Link>
                    </Button>
                ))}
            </div>
            <UserButton/>
        </div>
    </>)
}