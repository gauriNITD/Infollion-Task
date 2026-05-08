import { chats } from "@/lib/memoryStore";

import { extractTextFromPDF } from "@/lib/pdfParser";

export async function POST(req) {
    try {
        const formData = await req.formData();

        const file = formData.get("file");

        const chatId = formData.get("chatId");

        const type = formData.get("type");

        if (!file || !chatId) {
            return Response.json(
                {
                    error: "Missing file or chatId",
                },
                {
                    status: 400,
                }
            );
        }

        if (!chats[chatId]) {
            chats[chatId] = {
                messages: [],
                documentText: "",
                image: null,
            };
        }

        const bytes = await file.arrayBuffer();

        const buffer = Buffer.from(bytes);

        if (type === "document") {
            let extractedText = "";

            if (file.type === "application/pdf") {
                extractedText = await extractTextFromPDF(buffer);
            } else {
                extractedText = buffer.toString("utf-8");
            }

            if (!extractedText || extractedText.trim() === "") {
                extractedText =
                    "Document uploaded successfully but no readable text was found.";
            }

            console.log("PDF TEXT:", extractedText);

            chats[chatId].documentText = extractedText;

            return Response.json({
                success: true,
                text: extractedText,
            });
        }

        if (type === "image") {
            const base64 = buffer.toString("base64");

            chats[chatId].image = {
                mimeType: file.type,
                base64,
            };

            return Response.json({
                success: true,
            });
        }

        return Response.json({
            success: false,
        });
    } catch (error) {
        console.log(error);

        return Response.json(
            {
                error: "Upload failed",
            },
            {
                status: 500,
            }
        );
    }
}
