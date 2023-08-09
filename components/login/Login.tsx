"use client"

import { FormEvent, useState } from "react";
import axios from "axios"
import { GOOGLE_AUTH_URL, LOGIN_URL, USER_DATA_URL } from "@/utils/urls"
import { IAuthTokens } from "@/types/types";
import { ACCESS_TOKEN } from "@/utils/consts";
import { useUserContext, useUserDispatchContext } from "@/contexts/userContext";
import { UserReducerActionType } from "@/types/enums";
import { redirect, usePathname } from "next/navigation"
import { GoogleLogin } from '@react-oauth/google';
import Link from "next/link";
import { useSetNotificationContext } from "@/contexts/notificationContext";

const Login = () => {

    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false)
    const userDispatch = useUserDispatchContext();
    const userContext = useUserContext();  
    const notificationContext = useSetNotificationContext()
    
    const router = usePathname()
    if (userContext?.user) {
        redirect("/summary")               
    }

    const handleFormSubmit = async (event: FormEvent) => {
        
        event.preventDefault()

        try {
            // get auth token
            let response = await axios.post(LOGIN_URL, { username: userName, password });
            
            // save in local storage
            const tokens: IAuthTokens = response.data;
            localStorage.setItem(ACCESS_TOKEN, tokens.access)

            // get the user data
            response = await axios.get(USER_DATA_URL, { 
                headers: {
                    Authorization: `Bearer ${tokens.access}`
                }
            })
            
            userDispatch({
                type: UserReducerActionType.Login,
                context: response.data
            })
            
        } catch(error) {
            console.log(error)
        }
    } 
        
    return (
        <div className="form-container">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-20 w-auto" 
                    src="https://cdn.discordapp.com/attachments/1123168193494646784/1127185942424338472/Screenshot_2023-07-08_at_13.33.38-removebg-preview_1.png"
                />
                <h2 className="sign-in-title">
                    Sign in to your account
                </h2>

            </div>
            <div className="mx-auto my-4">
                <GoogleLogin
                    onSuccess={ async (credentialResponse) => {
                        console.log(credentialResponse);
                        
                        try {
                            const response = await axios.post(
                                GOOGLE_AUTH_URL, 
                                {
                                    google_jwt: credentialResponse.credential
                                }
                            )

                            userDispatch({type: UserReducerActionType.Login, context: response.data})
                            
                            const tokens: IAuthTokens = response.data;
                            localStorage.setItem(ACCESS_TOKEN, tokens.access)
                            
                            notificationContext({
                                status: "success",
                                msg: "Successful Login!"
                            })
                        } catch(e) {
                            console.error(e)
                        }
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
            
            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                <form 
                    className="space-y-6" 
                    onSubmit={ (event) => handleFormSubmit(event)}>
                    <div className="mt-2">
                        <input 
                            required
                            placeholder="Your email"
                            type="email" 
                            value={ userName }
                            onChange={ (event) => setUserName(event.target.value) }
                            className="shadow-sm my-input-field"
                        />
                    </div>
                    <div>
                        <div className="mt-2">
                            <input  
                                required 
                                placeholder="Your password"
                                type={ showPassword? "text": "password" }
                                value={ password }
                                onChange={ (event) => setPassword(event.target.value)}
                                className="shadow-sm my-input-field" />
                        </div>
                        <div className="flex items-center mb-4 my-4">
                            <input 
                                id="default-checkbox" 
                                type="checkbox" 
                                disabled = { password.length <= 0 }
                                className="w-4 h-4 text-sky-600 bg-sky-100 border-sky-300 rounded" 
                                onClick={ () => setShowPassword(!showPassword)}
                            />
                            <label 
                                htmlFor="default-checkbox" 
                                className="ml-2 text-sm text-sky-600">
                                    Show Password
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm mx-auto">
                                <Link 
                                    href="#" 
                                    className="text-sky-600 hover:text-sky-400">
                                        Forgot password?
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button 
                            type="submit"
                            className="my-button">
                                Sign in
                            </button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member? <br/>
                    <Link href="./signup" className="flex justify-center mx-auto mt-2 text-sky-500 hover:text-sky-400">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )

}

export default Login;




