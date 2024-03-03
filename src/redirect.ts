"use server"

import { redirect as r } from "next/navigation"

const redirect = async (uri: string) => r(uri)

export default redirect