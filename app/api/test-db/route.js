import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        // Check connection health
        await prisma.$connect()

        // Fetch all users
        const users = await prisma.user.findMany()

        return Response.json({
            success: true,
            message: "Database connection successful",
            usersCount: users.length,
            users
        })
    } catch (error) {
        console.error("Database error:", error)
        return Response.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}
