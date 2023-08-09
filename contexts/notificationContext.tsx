"use client"

import React, { 
    createContext, 
    Dispatch, 
    ReactNode, 
    SetStateAction, 
    useContext, 
    useEffect, 
    useState 
} from "react";
import { INotificationData } from "@/types/types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const INITIAL_NOTIFICATION: INotificationData = {
    msg: "",
    status: ""
}

const NotificationContext = createContext<INotificationData> (INITIAL_NOTIFICATION)
const SetNotificationContext = createContext<Dispatch<SetStateAction<INotificationData>>>(() => {})


export const useSetNotificationContext = () => {
    return useContext(SetNotificationContext)
}

export const NotificationProvider = ( {children}: {children: ReactNode} ) => {

    const [notification, setNotification] = useState(INITIAL_NOTIFICATION)
    
    useEffect( () => {
        if(notification.status === "success") {
            toast.success(`${notification.msg}`);
        }
    }, [notification])
    
    return (
        <div>
            <NotificationContext.Provider value={ notification }>
                <SetNotificationContext.Provider value={ setNotification }>
                    { children }
                <ToastContainer 
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                </SetNotificationContext.Provider>
            </NotificationContext.Provider>
        </div>
        
    )
}



