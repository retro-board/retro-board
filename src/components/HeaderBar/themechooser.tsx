"use client"

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "~/components/ui/dropdown-menu";
import {MoonIcon, SunIcon, SunMoonIcon} from "lucide-react";
import {useFlags} from "@flags-gg/react-library";
import {useTheme} from "next-themes";

export function ThemeChooser() {
    const {setTheme} = useTheme()
    const {is} = useFlags()

    if (!is("theme chooser")?.enabled()) {
        return null
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SunMoonIcon className={"cursor-pointer h-6 w-6"} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align={"end"}>
                <DropdownMenuItem className={"cursor-pointer"} onClick={() => setTheme("light")}>
                    <SunIcon className={"h-6 w-6"} />
                </DropdownMenuItem>
                <DropdownMenuItem className={"cursor-pointer"} onClick={() => setTheme("dark")}>
                    <MoonIcon className={"h-6 w-6"} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}