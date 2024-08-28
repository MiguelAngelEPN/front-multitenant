import NextAuth from "next-auth";
import authOptions from "@/auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                tenantId: { label: "Tenant ID", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                // Realiza una solicitud a tu backend para autenticar al usuario
                const res = await fetch("http://localhost:3000/tenants/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        tenantId: credentials.tenantId,
                        password: credentials.password,
                    }),
                });

                const user = await res.json();

                // Si la autenticación es exitosa, devuelve un objeto usuario
                if (res.ok && user.status === "success") {
                    return {
                        id: user.data.id,
                        name: user.data.name,
                        email: user.data.email, // Ajusta según los datos que recibas
                    };
                }

                // Si la autenticación falla, devuelve null
                return null;
            },
        }),
    ],
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    callbacks: {
        async jwt({ token, user }) {
            // Agrega el id del usuario al token
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            // Agrega el id del usuario a la sesión
            session.user.id = token.id;
            return session;
        },
    },
});
export const { GET, POST } = handler;
