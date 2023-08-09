"use client"

import { useUserContext } from "@/contexts/userContext";
import { USER_WALLETS } from "@/utils/urls";
import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Wallets = () => {

    const userContext = useUserContext();
    const [myWallets, setWallets] = useState([])
    console.log(myWallets)

    if (!userContext?.user) {
        redirect('/login')
    }
    
    useEffect( () => {
        const getWallets = async () => {
            const token = localStorage.getItem("access_token")
            const wallets = await axios.get(USER_WALLETS, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                } 
            })
            
            setWallets(wallets.data.results)
        }

        getWallets()
        
    }, [])

    const walletsToRender = myWallets.map( (wallet) => {
        return (
            //@ts-ignore
            <h3>{wallet.wallet_address}</h3>
        )
    })
    
    return(
        <>
           { walletsToRender }
        </>
     
    )
}

export default Wallets;