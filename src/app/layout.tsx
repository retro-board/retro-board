import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import ClientProvider from "~/components/ClientProvider";
import {NextSSRPlugin} from "@uploadthing/react/next-ssr-plugin";
import {extractRouterConfig} from "uploadthing/server";

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
                {children}
            </div>
        </ClientProvider>
      </body>
    </html>
  );
}
