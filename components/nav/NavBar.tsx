"use client"
import { useUserContext } from "@/contexts/userContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
    
    const userContext = useUserContext();          
    const menuItems = [ 'summary', 'wallets', 'trade', 'history']
    const router = usePathname()

    const itemsToRender = menuItems.map( (item) => {
        const href = `/${item}`
        return (
            <li 
                key={menuItems.indexOf(item)} 
                hidden= { userContext?.user ? false : true }> 
                <Link 
                    href={href}
                    className="side-menu-item" 
                    style={
                    {
                        "backgroundColor": router == `/${item}` ? "#bae6fc" : 'transparent'
                    }}>
                    <span >{ item.charAt(0).toUpperCase() + item.slice(1) }</span> 
                </Link>
            </li> 
        )
    })

    return(
        <>            
            <nav className="relative top-0 z-50 mb-2 w-full bg-white border-b border-sky-200 bg-white w-full z-20 top-0 left-0 border-b-gray-200 border-gray-200">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start flex-row">
                            <Link href="./summary" className="flex ml-2 md:mr-24">
                                <img src="https://cdn.discordapp.com/attachments/1123168193494646784/1127215435440468070/Screenshot_2023-07-08_at_13.33.38-removebg-preview_3.png" className="h-10 mr-3" alt="Logo" />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-sky-700">
                                    My Exchange
                                </span>
                            </Link>
                        </div>
                        <ul className="font-medium flex flex-col p-0 rounded-lg md:flex-row md:space-x-16">
                           { itemsToRender }
                        </ul>
                        <div className="flex flex-row">
                        {
                            router != "/login" && !userContext?.user && 
                            <div className="mx-1">
                                <Link href="/login">
                                    <button 
                                        type="submit"
                                        className="my-button">
                                            Login
                                    </button>
                                </Link>
                            </div>
                        }
                        {
                            router != "/signup" && !userContext?.user && 
                            <div>
                                <Link href="/signup">
                                    <button 
                                        type="submit"
                                        className="my-button mx-0">
                                            Sign up
                                    </button>
                                </Link>
                            </div>
                        }   
                        { userContext?.user &&
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <Link
                                        href="/profile"
                                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-sky-300">
                                        <img 
                                            className="w-8 h-8 rounded-full" 
                                            src={ userContext.user.imgUrl } 
                                            alt={ userContext.user.firstName } />
                                    </Link>
                                </div>
                            </div>
                        }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar;

