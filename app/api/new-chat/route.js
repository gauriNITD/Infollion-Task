import { chats } from "@/lib/memoryStore";

export async function POST(req) {
    try {
        const body = await req.json();

        const { chatId } = body;

        delete chats[chatId];

        return Response.json({
            success: true,
        });
    } catch (error) {
        return Response.json(
            {
                error: "Failed to reset chat",
            },
            {
                status: 500,
            }
        );
    }
}
