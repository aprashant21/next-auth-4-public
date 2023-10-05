"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function CustomRegister() {
    const emailRef = useRef("");
    const passRef = useRef("");
    const confirmPassRef = useRef("");
    const [isLoading, setisLoading] = useState(false);
    const router= useRouter();

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            setisLoading(true);
            if (emailRef.current.length === 0) return alert('email field is empty');
            if (passRef.current.length < 6) return alert(
                'password must be 6 or more character long'
            )
            if (passRef.current !== confirmPassRef.current) return alert('password must be same')
            const payload = {
                email: emailRef.current,
                password: passRef.current
            }
            const formData = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
            const res = await fetch("http://localhost:3000/api/auth/register", formData);
            const resJson = await res.json();
            alert(`${resJson.message}`)
            router.push('/login')
            
        } catch (error) {
            alert(`${error}`)
        }
    }
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Next-Auth Register
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                SignUp to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" method="post">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input onChange={(event) => emailRef.current = event.target.value} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label for="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input onChange={(event) => passRef.current = event.target.value} type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                    <input onChange={(event) => confirmPassRef.current = event.target.value} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>

                                <button onClick={(event) => handleRegister(event)} className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{isLoading ? <span className="font-bold text-red-800 p-1">Registering...</span> : `Register`}</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Alreaady have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
