import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req) {
    try {
        const { email, password } = await req.json()
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            }
        })

        return Response.json({ success: true, user })
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 })
    }
}
