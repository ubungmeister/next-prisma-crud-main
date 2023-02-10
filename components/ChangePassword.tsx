import React, {FormEvent, useRef} from 'react';
import {useRouter} from "next/router";
import {RegisterData} from "@/components/Register";
import {changePassword} from "@/lib/utils";



const ChangePassword = () => {
    const oldPassInputRef = useRef<HTMLInputElement>(null)
    const newPassInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const password = oldPassInputRef.current?.value
        const email = newPassInputRef.current?.value
        if(email && password){
           await changePassword({email, password})
            alert('Success')
           await router.replace(router.asPath)
        }}

        return (
            <form
                className='mx-auto items-center w-auto min-w-[25%] max-w-min flex flex-col py-8 border rounded-md border-gray-500 space-y-4'
                onSubmit={(e) => onSubmitHandler(e)}>
                <h1 className='text-xl '>Password change</h1>
                <div>
                    <div>Old Password</div>
                    <input className='border border-gray-500 p-1' ref={oldPassInputRef}/>
                </div>
                <div>
                    <div>New Password</div>
                    <input className='border border-gray-500 p-1' ref={newPassInputRef}/>
                </div>
                <button className=' hover:bg-indigo-500 font-semibold p-1.5 bg-blue-400 text-white rounded-md text-xl'
                    type='submit'>Submit</button>
            </form>
        );
}

export default ChangePassword;