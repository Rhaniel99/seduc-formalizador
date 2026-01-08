import type React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

export default function GuestLayout({ children }: LayoutProps) {
    return (
        <>
            <div className="min-h-screen ">
                {children}
            </div>
        </>
    );
}