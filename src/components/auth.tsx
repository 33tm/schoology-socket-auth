"use client"

import { useEffect, useState } from "react"
import { io } from "socket.io-client"

import redirect from "@/redirect"

export const Auth = () => {
    const [token, setToken] = useState<string | null>()
    const [status, setStatus] = useState<string>("Continue")
    useEffect(() => setToken(localStorage.getItem("jwt")), [])
    const socket = io("http://localhost:443/auth", {
        autoConnect: false,
        auth: { token }
    })
    socket.on("status", setStatus)
    socket.on("auth", () => redirect("/app"))
    socket.on("token", token => {
        const { width, height } = screen
        const [left, top] = [(width - 480) / 2, (height - 675) / 2]
        window.open(
            `https://pausd.schoology.com/oauth/authorize?oauth_token=${token}&oauth_callback=tttm.us/callback/callback`,
            "_blank",
            `popup, width=480, height=675, left=${left} top=${top}`
        )
    })
    socket.once("callback", token => socket.emit("jwt", token))
    socket.once("jwt", jwt => {
        localStorage.setItem("jwt", jwt)
        redirect("/app")
    })
    return (
        <button onClick={() => {
            socket.connect()
            socket.emit("oauth")
        }}>{status}</button>
    )
}