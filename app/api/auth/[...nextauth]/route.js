import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                tenantId: { label: "tenantId", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_DIRECTION_PORT}/tenants/login`,
                    {
                      method: "POST",
                      body: JSON.stringify({
                        tenantId: credentials?.email,
                        password: credentials?.password,
                      }),
                      headers: { "Content-Type": "application/json" },
                    }
                  );
                  const user = await res.json();
          
                  if (user.error) throw user;
          
                  return user;
            }
        })
    ]
})

export { handler as GET, handler as POST }
