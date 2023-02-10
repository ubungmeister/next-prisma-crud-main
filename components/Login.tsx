import React, {FormEvent, useState} from 'react';
import {isLoginType, RegisterData} from "@/components/Register";
import {signIn} from "next-auth/react";
import {useRouter} from "next/router";
import {useAppContext} from "@/context/LoginContext";


const Login = () => {
    const {setLogin} = useAppContext()

    const initialState = {email: '', password: ''}
    const [loginData, setLoginData] = useState<RegisterData>(initialState)

    const router = useRouter()

    const onFormHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (loginData.email && loginData.password.trim().length >= 6) {
            const result = await signIn('credentials', {
                email: loginData.email,
                password: loginData.password,
                redirect: false
            })
            if (!result?.error) {
                await router.replace('/profile')
            }
        }
    }

    return (
        <form
            className='mx-auto items-center w-auto min-w-[25%] max-w-min flex flex-col py-8 border rounded-md border-gray-500 space-y-4'
            onSubmit={(e) => onFormHandler(e)}>
            <h1 className='text-xl'>Login </h1>
            <input className='border border-gray-500 p-2 rounded-md'
                placeholder={'Email'}
                value={loginData.email}
                onChange={(e) =>
                    setLoginData({...loginData, email: e.currentTarget.value})}
            />
            <input className='border border-gray-500 p-2 rounded-md'
                placeholder={'Password'}
                value={loginData.password}
                onChange={(e) =>
                    setLoginData({...loginData, password: e.currentTarget.value})}
            />
            <button className=' hover:bg-indigo-500 font-semibold p-1.5 bg-blue-400 text-white rounded-md text-xl'
                    type={"submit"}>Submit
            </button>

            <div className='flex flex-row space-x-1'>
                <p>Don`t have an account</p>
                <button className='text-blue-500 font-bold hover:text-red-500'
                        onClick={() => setLogin(false)}>Register
                </button>
            </div>

        </form>
    );
};


export default Login;