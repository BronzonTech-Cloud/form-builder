import React from 'react'
import { Loader2Icon } from "lucide-react"

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen fixed inset-0 z-[9999] bg-background">
            <Loader2Icon className="size-5 animate-spin" />
        </div>
    )
}

export default Loading
