import { signInWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";
import { customAuth } from "../../../../../firebase/firebase";

export async function POST(request) {

    try {
        const {email , password } = await request.json();
        if(email.length === 0) throw new Error('email must not be empty')
        if(password.length === 0) throw new Error('email must not be empty')
        if(password.length < 6) throw new Error('email must be atleast 6 character long')
        const userCred = await signInWithEmailAndPassword(customAuth, email, password)
        const user = userCred?.user;
        return NextResponse.json({ message: 'successfully logged in', status: 200, data: user })
    } catch (error) {
        return NextResponse.json({ error: `${error?.message}` })

    }
}