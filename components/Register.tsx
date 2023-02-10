import React, {FormEvent, useRef, useState} from 'react';
import {createUser} from "@/lib/utils";
import {useAppContext} from "@/context/LoginContext";

export type RegisterData = {
    email: string
    password: string
}

export type isLoginType = {
    isLogin: (isLogin: boolean) => void
}


const Register = () => {
    const {setLogin} = useAppContext()

    const initialState = {email: '', password: ''}
    const [registerData, setRegisterData] = useState<RegisterData>(initialState)

    const onFormHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (registerData.email.trim() && registerData.password.trim().length >= 6) {
            await createUser(registerData)
        }
    }

    return (
        <form
            className='mx-auto items-center w-auto min-w-[25%] max-w-min flex flex-col py-8 border rounded-md border-gray-500 space-y-4'
            onSubmit={(e) => onFormHandler(e)}>
            <h1 className='text-xl'>Register</h1>
            <input className='border border-gray-500 p-2 rounded-md'
                placeholder={'Email'}
                value={registerData.email}
                onChange={(e) =>
                    setRegisterData({...registerData, email: e.currentTarget.value})}
            />
            <input className='border border-gray-500 p-2 rounded-md'
                placeholder={'Password'}
                value={registerData.password}
                onChange={(e) =>
                    setRegisterData({...registerData, password: e.currentTarget.value})}
            />
            <button className='hover:bg-indigo-500 font-semibold p-1.5 bg-blue-400 text-white rounded-md text-xl'
                    type={"submit"}>Submit
            </button>
            <div className='flex flex-row space-x-1'>
                <p>Have have an account</p>
                <button className='text-blue-500 font-bold hover:text-red-500' onClick={() => setLogin(true)}> Login
                </button>
            </div>
        </form>
    );
};

export default Register;