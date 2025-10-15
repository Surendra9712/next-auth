"use client"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {RoleGate} from "@/components/auth/role-gate";
import {UserRole} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

const AdminPage =()=>{
    const fetchAdmin = ()=>{
        fetch('/api/admin').then((res)=> {
            console.log(res.ok)
            if(res.ok){
                toast.success("Admin route called successfully")
            }else {
                toast.error("Admin route failed")
            }
            // console.log(res)
        })
    }
    return(
        <Card className="max-w-4xl w-full shadow-md">
            <CardHeader>
                <CardTitle className="text-2xl text-center">Admin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    Helo Admin
                </RoleGate>
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">Admin-only API Route</p>
                    <Button onClick={fetchAdmin}>Click to test</Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">Admin-only Server Action</p>
                    <Button>Click to test</Button>
                </div>
            </CardContent>
        </Card>
    )
}
export default AdminPage;