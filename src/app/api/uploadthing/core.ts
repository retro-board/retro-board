import {createUploadthing, FileRouter} from "uploadthing/next";
import {auth} from "~/server/auth";
import {UploadThingError} from "uploadthing/server";

const f = createUploadthing()

export const fileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" }}).middleware(async () => {
        const session = await auth()
        if (!session?.user?.id) {
            throw new UploadThingError("Unauthorized")
        } else {
            return {
                userId: session.user.id
            }
        }
    }).onUploadComplete(async ({metadata}) => {
        return {
            uploadedBy: metadata.userId,
        }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof fileRouter
