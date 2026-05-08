"use client";

import { useState } from "react";

import {
    Send,
    ImageIcon,
    FileText,
    Loader2,
    X,
} from "lucide-react";

export default function ChatInput({
    sendMessage,
    setUploadedDoc,
    setUploadedImage,
    uploadedDoc,
    uploadedImage,
    chatId,
}) {
    const [message, setMessage] =
        useState("");

    const [uploading, setUploading] =
        useState(false);

    const handleSend = async () => {
        if (
            !message.trim() &&
            !uploadedDoc &&
            !uploadedImage
        )
            return;

        await sendMessage(message);

        setMessage("");
    };

    const uploadFile = async (
        file,
        type
    ) => {
        const formData = new FormData();

        formData.append("file", file);

        formData.append("chatId", chatId);

        formData.append("type", type);

        await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });
    };

    const handleImageUpload = async (
        e
    ) => {
        try {
            setUploading(true);

            const file = e.target.files[0];

            if (!file) return;

            const imageUrl =
                URL.createObjectURL(file);

            setUploadedImage(imageUrl);

            await uploadFile(file, "image");
        } catch (error) {
            console.log(error);
        }

        setUploading(false);
    };

    const handleDocUpload = async (
        e
    ) => {
        try {
            setUploading(true);

            const file = e.target.files[0];

            if (!file) return;

            setUploadedDoc(file);

            await uploadFile(
                file,
                "document"
            );
        } catch (error) {
            console.log(error);
        }

        setUploading(false);
    };

    return (
        <div className="sticky bottom-0 border-t border-zinc-800/50 bg-[#09090b]/95 p-3 md:p-5 backdrop-blur-xl">
            <div className="mx-auto w-full max-w-5xl rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4 shadow-2xl backdrop-blur-xl">
                {/* ATTACHMENT PREVIEW */}
                {(uploadedDoc ||
                    uploadedImage) && (
                        <div className="mb-4 flex flex-wrap gap-3">
                            {uploadedImage && (
                                <div className="relative">
                                    <img
                                        src={uploadedImage}
                                        alt="preview"
                                        className="h-24 w-24 rounded-2xl object-cover border border-zinc-700"
                                    />

                                    <button
                                        onClick={() =>
                                            setUploadedImage(
                                                null
                                            )
                                        }
                                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-lg"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            )}

                            {uploadedDoc && (
                                <div className="relative flex items-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3">
                                    <FileText
                                        className="text-blue-400"
                                        size={18}
                                    />

                                    <span className="max-w-[180px] truncate text-sm text-zinc-200">
                                        {uploadedDoc.name}
                                    </span>

                                    <button
                                        onClick={() =>
                                            setUploadedDoc(
                                                null
                                            )
                                        }
                                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-lg"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                {/* INPUT AREA */}
                <div className="flex items-end gap-3">
                    <div className="flex gap-2">
                        <label className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl bg-zinc-800 transition hover:bg-zinc-700">
                            <ImageIcon
                                className="text-zinc-300"
                                size={20}
                            />

                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/jpg"
                                hidden
                                onChange={
                                    handleImageUpload
                                }
                            />
                        </label>

                        <label className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl bg-zinc-800 transition hover:bg-zinc-700">
                            <FileText
                                className="text-zinc-300"
                                size={20}
                            />

                            <input
                                type="file"
                                accept=".pdf,.txt"
                                hidden
                                onChange={
                                    handleDocUpload
                                }
                            />
                        </label>
                    </div>

                    <textarea
                        rows={1}
                        value={message}
                        onChange={(e) =>
                            setMessage(
                                e.target.value
                            )
                        }
                        onKeyDown={(e) => {
                            if (
                                e.key === "Enter" &&
                                !e.shiftKey
                            ) {
                                e.preventDefault();

                                handleSend();
                            }
                        }}
                        placeholder="Message Gemini..."
                        className="max-h-40 flex-1 resize-none bg-transparent px-3 py-2 text-white outline-none placeholder:text-zinc-500"
                    />

                    <button
                        onClick={handleSend}
                        disabled={uploading}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black transition hover:scale-105 disabled:opacity-50"
                    >
                        {uploading ? (
                            <Loader2
                                className="animate-spin"
                                size={18}
                            />
                        ) : (
                            <Send size={18} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}