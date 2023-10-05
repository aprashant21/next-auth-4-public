import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    adapter: FirestoreAdapter({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      }),
    // Configure one or more authentication providers
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
          }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
          }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "coding@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials || !credentials?.email || !credentials?.password) throw new Error('Email or password may be empty!');
                // const user = users.find((u) => u.email === credentials.email);
                const formData = {
                    email: credentials.email,
                    password: credentials.password
                }
                const payload = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
                const res = await fetch('http://localhost:3000/api/auth/login', payload);
                const resJson = await res.json();
                const user = resJson.data;
                if (user?.email === credentials.email) {
                    return user
                } else {
                    throw new Error('Invalid credentials! Either email or password may not be correct')
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 365, // 365 days
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, user, token }) {
            const newSession = session;
            if (token?.user) {
                newSession.user = token.user
                newSession.accessToken = token.accessToken;
            }

            return newSession
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            const newToken = token;
            if (user) {
                newToken.user = user;
                newToken.accessToken = account?.access_token;
            }
            return newToken
        }
    }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };
