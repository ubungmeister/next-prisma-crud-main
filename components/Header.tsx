import React, {useEffect, useState} from 'react';
import {signOut, useSession} from "next-auth/react";
import {LoginButton, LogoutButton, RegisterButton} from "@/lib/styles";
import {useAppContext} from "@/context/LoginContext";
import Link from "next/link";


const Header = () => {
    const {setLogin} = useAppContext()

    const {status} = useSession()

    const [isAuthenticated, seIsAuthenticated] = useState(false)
    useEffect(() => {
        if (status === 'unauthenticated') {
            setLogin(false)
        }
        if (status === 'authenticated') {
            setLogin(true)
        }
    }, [status])

    return (
        <div className='bg-gray-200 p-4 flex justify-center space-x-3'>
            {isAuthenticated ? <LogoutButton/> :
                <button
                    onClick={()=>setLogin(true)}
                    className='border border-blue-600 p-2 text-xl rounded-md
                    hover:bg-blue-500 hover:text-white'>Login
                </button>
            }
            {!isAuthenticated &&
                <Link href={'/'}>

                    <button
                        onClick={()=>setLogin(false)}
                        className='border border-blue-600 p-2 text-xl rounded-md hover:bg-blue-500 hover:text-white'>Register
                    </button>
                </Link>
            }
        </div>
    );
};

export default Header;