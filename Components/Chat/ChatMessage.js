"use client";

import { motion } from "framer-motion";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
    Bot,
    User,
    FileText,
} from "lucide-react";

export default function ChatMessage({
    message,
}) {
    const isUser = message.role === "user";

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.3,
            }}
            className={`flex gap-4 ${isUser
                    ? "justify-end"
                    : "justify-start"
                }`}
        >
            {!isUser && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                    <Bot size={18} />
                </div>
            )}

            <div
                className={`max-w-[90%] md:max-w-[75%] rounded-3xl border px-6 py-5 shadow-xl backdrop-blur-xl ${isUser
                        ? "border-white/20 bg-white text-black"
                        : "border-zinc-800 bg-zinc-900/80 text-zinc-100"
                    }`}
            >
                {/* IMAGE */}
                {message.image && (
                    <div className="mb-4 overflow-hidden rounded-2xl border border-zinc-700">
                        <img
                            src={message.image}
                            alt="upload"
                            className="max-h-72 w-full object-cover"
                        />
                    </div>
                )}

                {/* DOCUMENT */}
                {message.document && (
                    <div
                        className={`mb-4 flex items-center gap-3 rounded-2xl border px-4 py-3 ${isUser
                                ? "border-zinc-300 bg-zinc-100"
                                : "border-zinc-700 bg-zinc-800"
                            }`}
                    >
                        <FileText
                            size={20}
                            className={
                                isUser
                                    ? "text-black"
                                    : "text-blue-400"
                            }
                        />

                        <span className="text-sm">
                            {message.document.name}
                        </span>
                    </div>
                )}

                <div className="prose prose-invert max-w-none prose-p:leading-8 prose-p:text-[15px] prose-headings:text-white prose-strong:text-white prose-code:text-blue-400 prose-pre:rounded-2xl prose-pre:border prose-pre:border-zinc-800 prose-pre:bg-black/70">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                    >
                        {message.content}
                    </ReactMarkdown>
                </div>
            </div>

            {isUser && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-black shadow-lg">
                    <User size={18} />
                </div>
            )}
        </motion.div>
    );
}