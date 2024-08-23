import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        tenantId: { label: "Tenant ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch("http://localhost:3000/tenants/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tenantId: credentials.tenantId,
              password: credentials.password,
            }),
          });

          const user = await response.json();

          if (!response.ok) {
            throw new Error(user.message || "Login failed");
          }

          if (user && user.status === "success") {
            return user; // Devuelve el objeto del usuario si la autenticación es exitosa
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // Ruta personalizada para la página de login
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
