import {CardWrapper} from "@/components/auth/card-wrapper";
import {BsExclamationTriangleFill} from "react-icons/bs";

export const ErrorCard =()=>{
    return (
        <CardWrapper
            backButtonLabel={"Back to login"}
            backButtonHref="/auth/login"
            headerLabel="Opps! Something went wront!"
        >
            <div className="w-full flex justify-center items-center">
                <BsExclamationTriangleFill   className="size-6 text-destructive"/>
            </div>
        </CardWrapper>
    )
}