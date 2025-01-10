"use client"

import {useFlags} from "@flags-gg/react-library";
import {useSession} from "next-auth/react";

export function UserNav() {
    const {is} = useFlags()
    const sess = useSession()

    console.info("sess", sess)

    if (!is("user nav")?.enabled()) {
        return null
    }

    return <></>
}