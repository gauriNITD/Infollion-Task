import { model } from "@/lib/gemini";
import { chats } from "@/lib/memoryStore";

export async function POST(req) {
    try {
        const body = await req.json();

        const { message, chatId } = body;

        if (!chats[chatId]) {
            chats[chatId] = {
                messages: [],
                documentText: "",
                image: null,
            };
        }

        const currentChat = chats[chatId];

        currentChat.messages.push({
            role: "user",
            content: message,
        });

        let prompt = `
You are a helpful AI assistant.

Conversation History:
${currentChat.messages
                .map((m) => `${m.role}: ${m.content}`)
                .join("\n")}

Uploaded Document:
${currentChat.documentText || "No document uploaded."}

`;

        const parts = [{ text: prompt }];

        if (currentChat.image) {
            parts.push({
                inlineData: {
                    mimeType: currentChat.image.mimeType,
                    data: currentChat.image.base64,
                },
            });
        }

        const result = await model.generateContent(parts);

        const response =
            result.response.text()?.trim();

        if (!response) {
            return Response.json({
                reply:
                    "⚠️ Something went wrong. Please try again later.",
            });
        }

        currentChat.messages.push({
            role: "assistant",
            content: response,
        });

        return Response.json({
            reply: response,
        });
    } catch (error) {
        console.log("CHAT ERROR:", error);

        return Response.json({
            reply:
                "⚠️ Something went wrong while generating the response. Please try again in a few moments.",
        });
    }
}
