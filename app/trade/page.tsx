"use client"

import MyModal from "@/components/common/modal";
import { useUserContext } from "@/contexts/userContext";
import { IUserWallet } from "@/types/types";


const Trade = () => {

    const walletExample: IUserWallet = {
        asset_id: "BTC",
        balance: 4.6,
        wallet_address: "1231qweqwewqe"
    }
    const userContext = useUserContext();

    if (!userContext?.user) {
        // redirect('/login')
    }

    return(
        
        <MyModal wallet={walletExample}/>
        
    )
}

export default Trade;