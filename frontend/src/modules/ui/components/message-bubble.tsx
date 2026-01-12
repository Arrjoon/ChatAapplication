"use client";

import { User } from "lucide-react";
import clsx from "clsx";

type Props = {
    message: string;
    senderName: string;
    isOwnMessage: boolean;
    timestamp: string;
};

export const MessageBubble = ({ message, senderName, isOwnMessage, timestamp }: Props) => {
    return (
        <div
            className={clsx(
                "flex gap-2 max-w-[70%]",
                isOwnMessage ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
        >
            <User className="w-6 h-6 text-gray-600 mt-1" />

            <div
                className={clsx(
                    "px-4 py-2 rounded-lg shadow text-sm",
                    isOwnMessage
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none"
                )}
            >
                {!isOwnMessage && (
                    <div className="text-xs text-gray-500 mb-1">{senderName}</div>
                )}
                {message}
                <div className="text-xs text-gray-500 mt-1">{timestamp}</div>
            </div>
        </div>
    );
};
