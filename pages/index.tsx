import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Register from "@/components/Register";
import Login from "@/components/Login";
import ChangePassword from "@/components/ChangePassword";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getSession} from "next-auth/react";
import {useAppContext} from "@/context/LoginContext";




export default function Home() {
    const {isLogin} = useAppContext()

    const router = useRouter()
    useEffect(()=>{
        getSession().then(session=>{
            if(session){
                router.replace('/profile')
            }
        })
    },[router])

    return (
        <div className='bg-white min-h-screen'>
            <div className='flex items-center pt-24'>
                {isLogin? <Login/> :<Register/>}
            </div>
        </div>
    )
}
