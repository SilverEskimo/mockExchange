"use client"

import axios from "axios";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useUserDispatchContext } from "@/contexts/userContext";
import { UserReducerActionType } from "@/types/enums";
import { ACCESS_TOKEN } from "@/utils/consts";
import { USER_DATA_URL } from "@/utils/urls";


// Axios Interceptor 
// axios.interceptors.request.use((config) => {
//     const token = localStorage.getItem("access_token")
//     // @ts-ignore
//     config.headers.Authorization = `Bearer ${token}`
    
//     return config;
// })

const MockExchange = ( {children}: { children: React.ReactNode }) => {

    const userDispatch = useUserDispatchContext() 

    useEffect( () => {
        
        const token = localStorage.getItem(ACCESS_TOKEN)
        
        if (token) {
            const getUserData = async () => {
                try {
                    const userDataResponse = await axios.get(USER_DATA_URL, { 
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    userDispatch({type: UserReducerActionType.Login, context: userDataResponse})
                } catch(e) {
                    redirect("/signup")    
                }
            }
            console.log("Calling me")
            getUserData()
        }   
}, [])

    return (
        <div>
            { children }
        </div>
        
    )
}
    
export default MockExchange;