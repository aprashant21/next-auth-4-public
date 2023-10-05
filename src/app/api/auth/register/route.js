import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";
import { customAuth } from "../../../../../firebase/firebase";

export async function POST(request) {
    try {
        const {email, password} = await request.json();
        if(email.length === 0) throw new Error('email must not be empty')
        if(password.length === 0) throw new Error('password must not be empty')
        const res = await createUserWithEmailAndPassword(customAuth, email, password);
        const user = res?.user;
        return NextResponse.json({ message: 'successfully posted', status: 200, data: user })

    } catch (error) {
        return NextResponse.json({ error: `${error?.message}` })
    }
}