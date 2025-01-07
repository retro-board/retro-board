import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import ClientProvider from "~/components/ClientProvider";
import {NextSSRPlugin} from "@uploadthing/react/next-ssr-plugin";
import {extractRouterConfig} from "uploadthing/server";
import {fileRouter} from "~/app/api/uploadthing/core";
import HeaderBar from "~/components/HeaderBar";

export const metadata: Metadata = {
  title: "Retro-Board.it",
  description: "Retro and Sprint Poker Board",
  icons: [{
      rel: "icon",
      url: "/favicon.ico"
  }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ClientProvider>
            <div className={"relative flex min-h-screen flex-col bg-muted/40"}>
                <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
                <div className={"flex flex-col sm:py-4 size-full"}>
                    <HeaderBar />
                    <main className={"flex-1 size-full p-4"} suppressHydrationWarning={true}>
                        {children}
                    </main>
                </div>
            </div>
        </ClientProvider>
      </body>
    </html>
  );
}
