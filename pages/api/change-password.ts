import {NextApiRequest, NextApiResponse} from "next";
import {getSession} from "next-auth/react";
import {PrismaClient} from "@prisma/client";
import {hashPassword, verifyPassword} from "@/lib/utils";


export async function handler(req:NextApiRequest, res:NextApiResponse){
    const prisma = new PrismaClient()

    if (req.method !== 'PATCH') {
        return
    }
    const session =await getSession({req:req})
    //by passing req, getSession will look for a token or
    // cookies an if he finds it inside req it will return session object or null
    if(!session){
        res.status(400).json({message: 'User is not login'})
        return
    }
    const userEmail =session.user?.email as string
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword
    const user =  await prisma.user.findFirst({
        where: {
            email: userEmail
        }
    })
    if(!user){
        res.status(404).json({message: 'User not found'})
        return
    }
    const currentPassword =user.password
    const passwordCheck = await verifyPassword(oldPassword,currentPassword)
    if(!passwordCheck){
        res.status(404).json({message: 'Passwords are not equal'})
        return
    }
    const hashedPassword = await hashPassword(newPassword)
    const result =await prisma.user.update({
        where: {
            email: userEmail
        },
        data: {
            password: hashedPassword
        }
    })

}