"use client"

import { useUserContext } from "@/contexts/userContext";
import { redirect } from "next/navigation";


const Summary = () => {
    const userContext = useUserContext();

    if (!userContext?.user) {
        // redirect('/login')
    }

    
    return(
        <h1>Summary (First post login) Page</h1>
    )
}

export default Summary;