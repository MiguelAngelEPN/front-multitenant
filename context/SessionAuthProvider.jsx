"use client";
import { SessionProvider } from "next-auth/react";
import { Children } from "react";

const SessionAuthProvider = ({Children}) => {
    return (
        <SessionProvider>
            {Children}
        </SessionProvider>
    )
}
export default SessionAuthProvider