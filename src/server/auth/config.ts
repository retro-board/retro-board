import { PrismaAdapter } from "@auth/prisma-adapter";
import {type DefaultSession, NextAuthOptions} from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

import { db } from "~/server/db";
import {env} from "~/env";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      access_token?: string;
    } & DefaultSession["user"];
  }
}

export const authConfig: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: env.KEYCLOAK_ID,
      clientSecret: env.KEYCLOAK_SECRET,
      issuer: env.KEYCLOAK_ISSUER,
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    jwt: ({ token, account }) => {
      if (account) {
        token.id = account.id;
        token.access_token = account.access_token;
      }
      return token;
    },
    session: ({ session }) => {
      return {
        ...session,
        user: {
          ...session.user,
        },
      }
    },
  },
};
