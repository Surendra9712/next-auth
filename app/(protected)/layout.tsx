import {Navbar} from "@/app/(protected)/_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = ({children}: ProtectedLayoutProps) => {
    return <div className="p-6 w-full flex flex-col justify-center items-center gap-y-10">
        <Navbar/>
        {children}</div>
}
export default ProtectedLayout;