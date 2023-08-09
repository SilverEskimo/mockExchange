"use client"

import { IUserData } from "../types/types";
import { UserReducerActionType } from "@/types/enums"
import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from "@/utils/consts";

export const userReducer = (currentState: IUserData, action: { type: UserReducerActionType, context: any }) => {
    switch(action.type) {
        case UserReducerActionType.Login:
            const responseData = action.context;
            const newUserData: IUserData = {
                user: {
                    id: responseData.id,
                    firstName: responseData.first_name,
                    lastName: responseData.last_name,
                    email: responseData.email,
                    username: responseData.username,
                    imgUrl: responseData.img_url
                }
                
            }
            return newUserData;
    }
}

const UserContext = createContext <IUserData | null>(null);
const UserDispatchContext = createContext <Dispatch<{ type: UserReducerActionType, context: any }>>( () => {} );

export const useUserContext = () => {
    return useContext(UserContext)
};

export const useUserDispatchContext = () => {
    return useContext(UserDispatchContext)
};


export const UserProvider = ({ children }: {children: ReactNode}) => {
    
    const initialUserDataState: IUserData = { 
        user: null
    }

    const [userData, userDataDispatch] = useReducer(userReducer, initialUserDataState);

    return(
        <GoogleOAuthProvider clientId={ GOOGLE_CLIENT_ID }>
            <UserContext.Provider value={userData}>
                <UserDispatchContext.Provider value={userDataDispatch}>
                    { children }
                </UserDispatchContext.Provider>
            </UserContext.Provider>
        </GoogleOAuthProvider>
    )
}