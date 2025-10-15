import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FaUser} from "react-icons/fa";
import SignOutButton from "@/components/auth/signout-button";
import { AiOutlineLogout } from "react-icons/ai";
import {useCurrentUser} from "@/hooks/use-current-user";

export const UserButton = () => {
    const user = useCurrentUser();
    return(
        <>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image ?? ""}/>
                    <AvatarFallback className="bg-sky-500">
                        <FaUser className="size-5 text-white"/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <SignOutButton>
                    <DropdownMenuItem>
                        <AiOutlineLogout />
                        Logout
                    </DropdownMenuItem>
                </SignOutButton>

            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}