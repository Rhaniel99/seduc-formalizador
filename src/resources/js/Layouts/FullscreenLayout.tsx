import { PropsWithChildren } from "react";

export default function FullscreenLayout({ children }: PropsWithChildren) {
    return (
        <div className="w-full h-screen overflow-hidden"> 
            {children}
        </div>
    );
}