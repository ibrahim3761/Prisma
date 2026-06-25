import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface"

const loginUser = async (payload : ILoginUser)=>{
    const {email, password} = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where:{
            email : email
        },
    })

    const isPaasswordMtched = await bcrypt.compare(password, user.password);

    if(!isPaasswordMtched){
        throw new Error("Password is incorrect!!")
    }

    return user
}

export const authService = {
    loginUser
}