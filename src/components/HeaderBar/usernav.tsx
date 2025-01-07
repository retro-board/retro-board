"use client"

import {Session} from "next-auth";
import {useFlags} from "@flags-gg/react-library";

export function UserNav({session}: { session: Session | null }) {
    const {is} = useFlags()

    if (!is("user nav")?.enabled()) {
        return null
    }

    return <></>
}