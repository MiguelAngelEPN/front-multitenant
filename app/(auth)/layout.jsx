"use client";
import SessionAuthProvider from '@/context/SessionAuthProvider';
export default function AuthLayout({ children }) {
    return (
        <div>
            {children}
        </div>
    );
}