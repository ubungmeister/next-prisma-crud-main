import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaClient} from "@prisma/client/";
import {verifyPassword} from "@/lib/utils";

const prisma = new PrismaClient()

export default NextAuth({
    session: {strategy: "jwt"},
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: "Credentials",
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
                async authorize(credentials){
                    const findUser =  await prisma.user.findFirst({
                        where: {
                            email: credentials?.email
                        }
                    })
                    if(!findUser){
                        console.log('No user found')
                    }
                    const isValid = await verifyPassword(credentials?.password, findUser?.password)
                    if(!isValid){
                        console.log('Could not login')
                    }
                    return {
                        email:findUser?.email
                    }
                }
        })
    ],
    pages: {signIn:'/'}
})
