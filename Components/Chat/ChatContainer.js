"use client";

import { useEffect, useRef, useState } from "react";

import Sidebar from "./Sidebar";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

import { v4 as uuidv4 } from "uuid";

export default function ChatContainer() {
    const [messages, setMessages] = useState([]);

    const [chatHistory, setChatHistory] = useState([]);

    const [chatId, setChatId] = useState("");

    const [uploadedImage, setUploadedImage] =
        useState(null);

    const [uploadedDoc, setUploadedDoc] =
        useState(null);

    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);

    // LOAD CHATS FROM LOCAL STORAGE
    useEffect(() => {
        const savedChats =
            localStorage.getItem("geminiChats");

        const savedActiveChat =
            localStorage.getItem("activeChatId");

        if (savedChats) {
            const parsedChats = JSON.parse(savedChats);

            setChatHistory(parsedChats);

            if (savedActiveChat) {
                const activeChat = parsedChats.find(
                    (chat) => chat.id === savedActiveChat
                );

                if (activeChat) {
                    setChatId(activeChat.id);

                    setMessages(activeChat.messages || []);
                }
            }
        } else {
            createNewChat();
        }
    }, []);

    // SAVE CHATS TO LOCAL STORAGE
    useEffect(() => {
        if (chatHistory.length > 0) {
            localStorage.setItem(
                "geminiChats",
                JSON.stringify(chatHistory)
            );
        }

        if (chatId) {
            localStorage.setItem(
                "activeChatId",
                chatId
            );
        }
    }, [chatHistory, chatId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    // CREATE NEW CHAT
    const createNewChat = () => {
        const id = uuidv4();

        const newChat = {
            id,
            title: "New Chat",
            messages: [],
        };

        setChatHistory((prev) => [
            newChat,
            ...prev,
        ]);

        setChatId(id);

        setMessages([]);

        setUploadedDoc(null);

        setUploadedImage(null);

        localStorage.setItem("activeChatId", id);
    };

    // UPDATE CURRENT CHAT
    const updateCurrentChat = (updatedMessages) => {
        setChatHistory((prev) =>
            prev.map((chat) =>
                chat.id === chatId
                    ? {
                        ...chat,
                        messages: updatedMessages,
                        title:
                            updatedMessages[0]?.content?.slice(
                                0,
                                30
                            ) || "New Chat",
                    }
                    : chat
            )
        );
    };

    // SEND MESSAGE
    const sendMessage = async (text) => {
        if (!text.trim()) return;

        const userMessage = {
            role: "user",
            content: text,
            image: uploadedImage || null,
            document: uploadedDoc || null,
        };

        const updatedMessages = [
            ...messages,
            userMessage,
        ];

        setMessages(updatedMessages);
        setUploadedDoc(null);
        setUploadedImage(null);

        updateCurrentChat(updatedMessages);

        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",
                },

                body: JSON.stringify({
                    message: text,
                    chatId,
                }),
            });

            const data = await res.json();

            const botMessage = {
                role: "assistant",
                content:
                    data.reply?.trim() ||
                    "⚠️ Something went wrong. Please try again.",
            };

            const finalMessages = botMessage.content
                ? [...updatedMessages, botMessage]
                : updatedMessages;

            setMessages(finalMessages);

            updateCurrentChat(finalMessages);
        } catch (error) {
            console.log(error);

            const errorMessage = {
                role: "assistant",
                content:
                    "⚠️ Something went wrong while generating the response. Please try again.",
            };

            const finalMessages = [
                ...updatedMessages,
                errorMessage,
            ];

            setMessages(finalMessages);

            updateCurrentChat(finalMessages);
        }

        setLoading(false);
    };

    // SWITCH CHAT
    const switchChat = (chat) => {
        setChatId(chat.id);

        setMessages(chat.messages || []);

        localStorage.setItem(
            "activeChatId",
            chat.id
        );
    };

    return (
        <div className="flex h-screen">
            <Sidebar
                createNewChat={createNewChat}
                chatHistory={chatHistory}
                switchChat={switchChat}
                activeChatId={chatId}
            />

            <div className="flex flex-1 flex-col">
                <div className="flex-1 overflow-y-auto px-3 py-6 md:p-6">
                    <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
                        {messages.length === 0 && (
                            <div className="mt-32 text-center animate-in fade-in duration-700">
                                <h1 className="bg-gradient-to-r from-white via-blue-200 to-purple-400 bg-clip-text text-4xl md:text-6xl font-bold tracking-tight text-transparent">
                                    Gemini AI
                                </h1>

                                <p className="mx-auto mt-6 max-w-xl text-base md:text-lg leading-8 text-zinc-400">
                                    Upload PDFs, images, and chat
                                    naturally with advanced AI
                                    memory and contextual
                                    understanding.
                                </p>
                            </div>
                        )}

                        {messages.map((msg, index) => (
                            <ChatMessage
                                key={index}
                                message={msg}
                            />
                        ))}

                        {loading && (
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
                                    ✨
                                </div>

                                <div className="rounded-3xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-zinc-400 shadow-xl">
                                    <div className="flex gap-1">
                                        <span className="animate-bounce">
                                            ●
                                        </span>

                                        <span
                                            className="animate-bounce"
                                            style={{
                                                animationDelay: "0.2s",
                                            }}
                                        >
                                            ●
                                        </span>

                                        <span
                                            className="animate-bounce"
                                            style={{
                                                animationDelay: "0.4s",
                                            }}
                                        >
                                            ●
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* <UploadPreview
                            uploadedDoc={uploadedDoc}
                            uploadedImage={uploadedImage}
                        /> */}

                        <div ref={messagesEndRef} />
                    </div>
                </div>

                <ChatInput
                    sendMessage={sendMessage}
                    uploadedDoc={uploadedDoc}
                    setUploadedDoc={setUploadedDoc}
                    uploadedImage={uploadedImage}
                    setUploadedImage={setUploadedImage}
                    chatId={chatId}
                />
            </div>
        </div>
    );
}