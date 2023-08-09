"use client"

import { useUserContext } from "@/contexts/userContext";
import { redirect } from "next/navigation";

const Trade = () => {

    const userContext = useUserContext();

    if (!userContext?.user) {
        // redirect('/login')
    }

    return(
        <h1>Trade Page</h1>
    )
}

export default Trade;