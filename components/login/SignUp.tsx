"use client"

import axios from "axios";
import Link from "next/link"
import { redirect } from "next/navigation";
import { GoogleLogin } from '@react-oauth/google';
import React, { FormEvent, use, useState } from "react";
import { useUserDispatchContext } from "@/contexts/userContext";
import { ACCESS_TOKEN } from "@/utils/consts";
import { LOGIN_URL, USER_DATA_URL, USER_SIGNUP } from "@/utils/urls";
import { UserReducerActionType } from "@/types/enums";
import { IAuthTokens, IUserSignUpData } from "@/types/types";

const SignUp = () => {

    const [firstName, setFirstName] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const userDispatch = useUserDispatchContext();
    
    const handleFormSubmit = async (event: FormEvent) => {

        event.preventDefault()
        
        if(password !== passwordConfirmation) {
            console.log("Password confirmation is invalid")
            return;
        }

        const userSignUpData: IUserSignUpData = {
            first_name: firstName,
            last_name: lastName,
            email,
            username: email,
            password: password
        }
        try {

            let response = await axios.post(USER_SIGNUP, userSignUpData)
            
            response = await axios.post(LOGIN_URL, { username: email, password });
            
            const tokens: IAuthTokens = response.data;
            localStorage.setItem(ACCESS_TOKEN, tokens.access)

            response = await axios.get(USER_DATA_URL, { 
                headers: {
                    Authorization: `Bearer ${tokens.access}`
                }
            })
            
            userDispatch({
                type: UserReducerActionType.Login,
                context: response.data
            })

            // redirect("/summary")
            
        } catch(e) {
            console.log(e)
        }
        
    }

    return (
        <div className="form-container">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img 
                    className="mx-auto h-20 w-auto" 
                    src="https://cdn.discordapp.com/attachments/1123168193494646784/1127185942424338472/Screenshot_2023-07-08_at_13.33.38-removebg-preview_1.png"/>
                <h2 className="sign-in-title">
                    Register your account
                </h2>
            </div>
            <div className="mx-auto my-4 flex flex-col">
                <GoogleLogin
                    text="signup_with"
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
                <p className="mx-auto mt-4"> OR </p>
            </div>
            
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <form 
                    className="space-y-6"
                    onSubmit={ (event) => handleFormSubmit(event) }>
                    <div className="mt-2">
                        <input 
                            required
                            placeholder="Your first name"
                            value = { firstName }
                            onChange = { (event) => setFirstName(event.target.value) }
                            type="text" 
                            className="shadow-sm my-input-field"/>
                    </div>
                    <div className="mt-2">
                        <input 
                            required
                            placeholder="Your last name"
                            value={ lastName }
                            onChange={ (event) => setLastName(event.target.value) }
                            type="text" 
                            className="shadow-sm my-input-field"/>
                    </div>
                    <div className="mt-2">
                        <input 
                            required
                            placeholder="Your email address"
                            value={ email }
                            onChange={ (event) => setEmail(event.target.value)}
                            type="email" 
                            className="shadow-sm my-input-field"/>
                    </div>
                    <div className="mt-2">
                        <input  
                            required 
                            placeholder="Password"
                            value={ password }
                            onChange={ (event) => setPassword(event.target.value)}
                            type= {showPassword ? "text" : "password" }
                            className="shadow-sm my-input-field" />
                    </div>
                    <div className="mt-2">
                        <input  
                            required 
                            value={ passwordConfirmation }
                            placeholder="Confirm your password"
                            onChange={ (event) => setPasswordConfirmation(event.target.value)}
                            type= {showPassword ? "text" : "password" }
                            className="shadow-sm my-input-field" />
                    </div>
                    {/* <PasswordInput
                        showPassword= { showPassword }
                        password = { password }
                        setShowPassword = { setShowPassword }
                        setPassword = { setPassword }
                        placeholder = { "Your Password" }
                    />
                    <PasswordInput 
                        showPassword={ showPassword }
                        passwordConfirmation={ passwordConfirmation }
                        placeholder={ "Confirm your password" }
                        setPasswordConfirmation={ setPasswordConfirmation }
                        setShowPassword={ setShowPassword }
                    /> */}
                    <div className="flex items-center mb-4">
                        <input 
                            id="default-checkbox" 
                            type="checkbox" 
                            value="" 
                            className="w-4 h-4 text-sky-600 bg-sky-100 border-sky-300 rounded" 
                            onClick={ () => setShowPassword(!showPassword)}
                        />
                        <label 
                            htmlFor="default-checkbox" 
                            className="ml-2 text-sm font-medium text-sky-600">
                                Show Password
                        </label>
                    </div>
                    <div>
                        <button 
                            type="submit"
                            className="my-button">
                                Register
                            </button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account? <br/>
                    <Link href="./login" className="flex justify-center mx-auto mt-2 text-sky-500 hover:text-sky-400">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}


const PasswordInput = ({
        showPassword,
        setShowPassword,
        passwordConfirmation,
        setPasswordConfirmation,
        placeholder,
        password,
        setPassword

    } : {
        showPassword: boolean, 
        placeholder: string
        setShowPassword: any, 
        setPasswordConfirmation?: any, 
        passwordConfirmation?: string, 
        setPassword?: any,
        password?: any
    }
) => {
    
    const handleOnChange = (event: any) => {
    
        // password ? setPassword(event.target.value) : setPasswordConfirmation(event.target.value)
        
    }

    return(
        <div className="relative w-full container mx-auto">
            <input
                type={ showPassword ? "text" : "password" }
                value={ password ? password : passwordConfirmation }
                onChange={ (event) => handleOnChange(event) }
                placeholder={ placeholder }
                className="shadow-sm my-input-field"
            />
            <button
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                onClick={ (event) => {
                    event.preventDefault()
                    setShowPassword(!showPassword)
                    }
                }>

                { showPassword ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                    </svg>
                    )
                }
            </button>
        </div>
    )  
}
export default SignUp;



