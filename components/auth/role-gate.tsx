"use client"
import {UserRole} from "@prisma/client";
import {useCurrentRole} from "@/hooks/use-current-role";
import {FormError} from "@/components/form-error";

interface RoleGateProps {
    children: React.ReactNode
    allowedRole: UserRole
}

export const RoleGate = ({children, allowedRole}: RoleGateProps) => {
    const currentUserRole = useCurrentRole();
    if(currentUserRole !== allowedRole){
        return <FormError message={"You are not authorized to access this content!"}/>;
    }
    return (
        <>{children}</>
    )
}