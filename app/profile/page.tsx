"use client"

import { useUserContext, useUserDispatchContext } from "@/contexts/userContext";
import { redirect } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import axios, { AxiosProgressEvent } from "axios";
import { PROFILE_IMG_UPLOAD_DONE, PROFILE_IMG_URL } from "@/utils/urls";
import { UserReducerActionType } from "@/types/enums";


const Profile = () => {

    const userDispatch = useUserDispatchContext() 
    const userContext = useUserContext();
    const [selectedFile, setFile] = useState<File>()
    const [progress, setProgress] = useState(0)
    const [inFlight, setInFlight] = useState(false)
    const abortController = useRef(new AbortController())
    
    
    // @ts-ignore
    const handleUploadProgress = (progressEvent: AxiosProgressEvent) => {
        
        if (progressEvent.progress) {
            // @ts-ignore
            setProgress(progressEvent.progress * 100)
        }
    }

    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
        
        if(event.target.files){
            setFile(event.target.files[0])
        }   
    }


    const handleCancelFileUpload = async () => {
        abortController.current.abort()
    }
    const handleFileUpload = async () => {
        try {

            abortController.current = new AbortController()
            
            setInFlight(true)
            const token = localStorage.getItem("access_token")
            let response = await axios.post( 
                PROFILE_IMG_URL,
                { 
                    fileName: selectedFile?.name 
                }, 
                { 
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        // This header is needed if we upload a file to our BE and not using signer URLs
                        //'Content-Type': "multipart/form-data"
                    } 
                }
            )
        
            const s3ObjectName = response.data.fields.key
            
            response = await axios.post(
                response.data.url, 
                {
                    ...response.data.fields,
                    file: selectedFile
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    onUploadProgress: handleUploadProgress,
                    signal: abortController.current.signal
                }
            )
            
            response = await axios.post(
                PROFILE_IMG_UPLOAD_DONE,
                {
                    objectName: s3ObjectName
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            
            userDispatch({type: UserReducerActionType.Login, context: response.data})
    
        } catch(e) {
            console.log(e)
        } finally {
            setInFlight(false)
            setProgress(0)
        }
    }
        
    if (!userContext?.user) {
        // redirect('/login')
    }

    return(
        <div className="flex flex-col">
            <input 
                className="mx-1"
                type="file" 
                accept="image/*"
                onChange={ handleFileSelect } 
                disabled={ inFlight }/>
            <button 
                className="my-button w-20 my-2 mx-1"
                onClick={ inFlight ? handleCancelFileUpload : handleFileUpload }>
                    { inFlight? "Cancel" : "Upload" }
            </button>

        { 
        progress > 0 &&
            <div className="w-60 my-2 mx-1 bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{width: progress+'%'}}></div>
            </div>
        }
        </div>
        
    )
}

export default Profile;
