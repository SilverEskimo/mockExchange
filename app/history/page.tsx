"use client"

import { useUserContext } from "@/contexts/userContext";
import { redirect } from "next/navigation";

const HistoryPage = (props: any) => {

    
    const userContext = useUserContext();

    if (!userContext?.user) {
        // redirect('/login')
    }

    return (
        <h2>History page</h2>
  )
}


export default HistoryPage;