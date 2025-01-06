import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const flagsConfig = {
  projectId: "",
  agentId: "",
  environmentId: "",
}

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    KEYCLOAK_ID: z.string(),
    KEYCLOAK_SECRET: z.string(),
    KEYCLOAK_ISSUER: z.string(),

    UPLOADTHING_TOKEN: z.string(),

    COMMIT_HASH: z.string().optional(),

    STRIPE_KEY: z.string(),
    STRIPE_SECRET: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_FLAGS_AGENT: z.string().optional(),
    NEXT_PUBLIC_FLAGS_ENVIRONMENT: z.string().optional(),
    NEXT_PUBLIC_FLAGS_PROJECT: z.string().optional(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,

    KEYCLOAK_ID: process.env.KEYCLOAK_ID,
    KEYCLOAK_SECRET: process.env.KEYCLOAK_SECRET,
    KEYCLOAK_ISSUER: process.env.KEYCLOAK_ISSUER,

    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,

    COMMIT_HASH: process.env.COMMIT_HASH,

    STRIPE_KEY: process.env.STRIPE_KEY,
    STRIPE_SECRET: process.env.STRIPE_SECRET,

    NEXT_PUBLIC_FLAGS_AGENT: process.env.NEXT_PUBLIC_FLAGS_AGENT,
    NEXT_PUBLIC_FLAGS_ENVIRONMENT: process.env.NEXT_PUBLIC_FLAGS_ENVIRONMENT,
    NEXT_PUBLIC_FLAGS_PROJECT: process.env.NEXT_PUBLIC_FLAGS_PROJECT,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
