"use client"
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function CustomLogin() {
    const emailRef = useRef("");
    const passRef = useRef("");
    const router = useRouter();
    const [isLoading, setisLoading] = useState(false)

    const handleLogin = async (event) => {
        event.preventDefault();
        setisLoading(true);
        signIn("credentials", { email: emailRef.current, password: passRef.current, redirect: false }).then(res => {
            if (res.error == null) {
                router.push('/')
            }
            else {
                alert(`${res.error}`)
            }
        }).catch(error => {
            console.log(`${error}`);
        }).finally(() => {
            setisLoading(false);
        })
    }



    const LoginComponentButton = ({provider, icon}) => {
        const [isProviderLoading, setProviderLoading] = useState(false)

        const handleProviderLogin = async () => {
            try {
                setProviderLoading(true);
                await signIn(provider, { redirect: true, callbackUrl: 'http://localhost:3000' })
            } catch (error) {
                console.error(error);
            }
            finally {
                setProviderLoading(false)
            }
        }
        return (
            <>
                <button onClick={handleProviderLogin} className="flex gap-2 justify-center bg-blue-800 p-2 w-full text-white font-bold">
                    <img src={icon} alt="" className="h-6" />
                    {isProviderLoading ? <span className="animate-pulse">Loading...</span> : `Login with ${provider}`
                    }                                    </button>
            </>
        );
    }

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Next-Auth Login
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" method="post">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input onChange={(event) => emailRef.current = event.target.value} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input onChange={(event) => passRef.current = event.target.value} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>

                                <button onClick={(event) => handleLogin(event)} className="w-full bg-red-800 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{isLoading ? <span className="font-bold text-white p-1 animate-pulse">Loading...</span> : `Sign in`}</button>
                                <div className="flex gap-3">
                                    <span className="bg-gray-300 w-full h-[2px] mt-2"></span>
                                    <span className="text-gray-400 text-sm">OR</span>
                                    <span className="bg-gray-300 w-full h-[2px] mt-2"></span>
                                </div>
                                
                                <LoginComponentButton provider={'google'} icon={'google.svg'}/>
                                <LoginComponentButton provider={'facebook'} icon={'facebook.svg'}/>
                                <LoginComponentButton provider={'github'} icon={'github.svg'}/>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
