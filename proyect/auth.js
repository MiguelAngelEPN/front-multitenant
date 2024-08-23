import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        tenantId: { label: "Tenant ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Lógica para validar el tenantId y password
        const res = await fetch("https://your-backend-api/login", {
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

        if (res.ok && user) {
          // Retorna los datos del usuario si la autenticación es exitosa
          return user;
        } else {
          // Retorna null si la autenticación falla
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // Ruta personalizada para la página de login
  },
  session: {
    strategy: "jwt", // Usar JWT para las sesiones
  },
  secret: process.env.NEXTAUTH_SECRET, // Asegúrate de definir este valor en tu .env.local
};

export default authOptions;
