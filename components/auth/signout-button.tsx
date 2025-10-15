import {logout} from "@/actions/logout";

export default function SignOutButton({children}: { children: React.ReactNode}) {
    const handleSignOut = async () => {
        await logout();
    }
    return (
        <span onClick={handleSignOut}>
            {children}
        </span>
    );
}
