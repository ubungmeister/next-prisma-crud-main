import {compare, hash} from "bcryptjs";
import {RegisterData} from "@/components/Register";

export async function hashPassword(password: string) {
    const hashedPassword = await hash(password, 12)
    return hashedPassword
}
export async function verifyPassword(password:any, hashedPassword:any){
    const isValid = await compare(password,hashedPassword)
    return isValid
}

export async function createUser(data: RegisterData) {
    try {
        await fetch('/api/create-user', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
    } catch (err) {
        console.log(err)
    }
}

export async function changePassword (data:RegisterData){
    try{
        await fetch('/api/change-password',{
            method:'PATCH',
            body:JSON.stringify(data),
            headers:{
                'Content-type':'application/json'
            }
        })
    }catch (err){
        console.log(err)
    }
}