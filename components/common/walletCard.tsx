"use client"
import { IUserWallet } from "@/types/types"
import { CopyClipboard } from "@/components/common/copyClipboard"
import MyModal from "./modal"

const WalletCard = ({ wallet }: {wallet: IUserWallet}) => {
    
    const textToCopy = wallet.wallet_address
       
    const handleTransferClick = () => {
        console.log("Clicked transfer")
    }

    return(
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow m-2">
            <div className="flex flex-col items-center pb-10">
            <img 
            className="w-24 h-24 mb-3 rounded-full shadow-lg mt-2" 
            src={`/img/${wallet.asset_id.toLowerCase()}.png`} 
            alt="logo-asset"/>
                <h5 className="mb-1 text-xl font-medium text-gray-900">{ wallet.asset_id }</h5>
                <span className="text-sm text-gray-400">
                    <div className="flex flex-row">
                        { wallet.wallet_address } 
                        <CopyClipboard content={textToCopy}/>
                    </div> 
                </span>
                <div className="flex flex-row mt-3">
                    <span className="text-gray-800">
                        Balance: 
                    </span>
                    <span className="text-sky-800 mx-1"> { wallet.balance }</span>
                </div>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <a 
                    href="#"
                    onClick={ handleTransferClick } 
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-sky-600 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        Transfer
                    </a>
                </div>
                <MyModal wallet={wallet}/>
            </div>
        </div>
    )
}

export default WalletCard;