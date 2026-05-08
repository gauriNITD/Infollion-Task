"use client";

import {
    MessageSquarePlus,
    Sparkles,
    PanelLeft,
} from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

function SidebarContent({
    createNewChat,
    chatHistory,
    switchChat,
    activeChatId,
}) {
    return (
        <div className="flex h-full flex-col bg-[#0d0d0d] p-4">
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                    <Sparkles size={20} />
                </div>

                <div>
                    <h1 className="text-lg font-bold">
                        Gemini AI
                    </h1>

                    <p className="text-xs text-zinc-500">
                        Advanced Chat Assistant
                    </p>
                </div>
            </div>

            <button
                onClick={createNewChat}
                className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 font-semibold text-black transition hover:scale-[1.02]"
            >
                <MessageSquarePlus size={18} />
                New Chat
            </button>

            <div className="mt-6 flex flex-1 flex-col gap-2 overflow-y-auto">
                {chatHistory.map((chat) => (
                    <button
                        key={chat.id}
                        onClick={() =>
                            switchChat(chat)
                        }
                        className={`truncate rounded-2xl border p-3 text-left text-sm transition ${activeChatId === chat.id
                                ? "border-blue-500 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white"
                                : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                            }`}
                    >
                        {chat.title}
                    </button>
                ))}
            </div>

            <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                <p className="text-xs leading-6 text-zinc-400">
                    Upload PDFs, images, and
                    chat with Gemini using
                    advanced AI context memory.
                </p>
            </div>
        </div>
    );
}

export default function Sidebar(props) {
    return (
        <>
            {/* DESKTOP SIDEBAR */}
            <div className="hidden md:flex w-[290px] border-r border-zinc-800">
                <SidebarContent {...props} />
            </div>

            {/* MOBILE SIDEBAR */}
            <div className="absolute left-4 top-4 z-50 md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
                            <PanelLeft size={20} />
                        </button>
                    </SheetTrigger>

                    <SheetContent
                        side="left"
                        className="w-[290px] border-zinc-800 bg-[#0d0d0d] p-0"
                    >
                        <SidebarContent {...props} />
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}