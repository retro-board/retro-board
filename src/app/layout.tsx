import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import ClientProvider from "~/components/ClientProvider";
import {NextSSRPlugin} from "@uploadthing/react/next-ssr-plugin";
import {extractRouterConfig} from "uploadthing/server";
import {fileRouter} from "~/app/api/uploadthing/core";
import HeaderBar from "~/components/HeaderBar";
import {ReactNode} from "react";
import {env, flagsConfig} from "~/env";

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
}: Readonly<{ children: ReactNode }>) {
  const flagConfig: typeof flagsConfig = {
    projectId: env.NEXT_PUBLIC_FLAGS_PROJECT ?? "",
    agentId: env.NEXT_PUBLIC_FLAGS_AGENT ?? "",
    environmentId: env.NEXT_PUBLIC_FLAGS_ENVIRONMENT ?? "",
  }

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ClientProvider flagConfig={flagConfig}>
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
