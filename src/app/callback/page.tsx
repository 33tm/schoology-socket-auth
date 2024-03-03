"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { io } from "socket.io-client"

export default function Callback() {
    const socket = io("http://localhost:443/auth")
    socket.emit("callback", useSearchParams().get("oauth_token"))
    useEffect(() => { socket.on("disconnect", () => window.close()) }, [socket])
}