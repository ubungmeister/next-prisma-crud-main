import {useEffect} from "react";
import {getSession, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import ChangePassword from "@/components/ChangePassword";

const Profile = () => {
    const router = useRouter()
    useEffect(()=>{
        getSession().then(session=>{
            if(!session){
                router.replace('/')
            }
        })
    },[router])
    return (
            <div className='min-h-screen bg-white pt-24'>
                <ChangePassword/>
            </div>


    );
};

export default Profile;

