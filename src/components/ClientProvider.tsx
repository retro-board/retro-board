"use client"

import {ReactNode, useState} from "react";
import {flagsConfig} from "~/env";
import {ThemeProvider, useTheme} from "next-themes";
import {FlagsProvider} from "@flags-gg/react-library";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {TooltipProvider} from "~/components/ui/tooltip";
import {TRPCReactProvider} from "~/trpc/react";

export default function ClientProvider({ children, flagConfig }: { children: ReactNode, flagConfig?: typeof flagsConfig }) {
    const {theme} = useTheme();
    const [queryClient] = useState(() => new QueryClient());

    console.log("flagsConfig", flagConfig)

    return (
        <ThemeProvider attribute={"class"} defaultTheme={theme} enableSystem={true}>
            <QueryClientProvider client={queryClient}>
                <FlagsProvider options={flagConfig ?? flagsConfig}>
                    <TooltipProvider>
                        <TRPCReactProvider>
                            {children}
                        </TRPCReactProvider>
                    </TooltipProvider>
                </FlagsProvider>
            </QueryClientProvider>
        </ThemeProvider>
    )
}