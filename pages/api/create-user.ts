import type { NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient} from "@prisma/client/";
import {hashPassword} from "@/lib/utils";


export default async function handler(req:NextApiRequest, res:NextApiResponse){

    const prisma = new PrismaClient()
    const {email, password} = req.body
    const hashedPassword = await hashPassword(password)
    try{
        await prisma.user.create({
            data:{
                email,
                password:hashedPassword
            }
        })
        res.status(200).json({message:'Note Created'})
    }catch (err){
        console.log('error')
    }

}