import {signOut} from "next-auth/react";
import React from "react";
import Link from "next/link";

export const LoginButton = () => (

    <button
        className='border border-blue-600 p-2 text-xl rounded-md
hover:bg-blue-500 hover:text-white'>Login
    </button>
)
export const LogoutButton = () => (
    <button className='border border-blue-600 p-2 text-xl rounded-md hover:bg-blue-500 hover:text-white'
            onClick={() => signOut()}>Logout</button>
)
export const RegisterButton = () => (
    <Link href={'/'}>
        <button className='border border-blue-600 p-2 text-xl rounded-md hover:bg-blue-500 hover:text-white'>Register
        </button>
    </Link>
)