"use client"

import React, { useEffect, useRef, useState } from "react";

// Single-file Next.js + Tailwind chat dashboard (TypeScript/TSX)
// Default export a React component that renders a WhatsApp-like dashboard
// Contains: ChatList (rooms + 1:1), ChatWindow, MessageInput
// Includes a small `useChat` hook stub showing where to attach WebSocket/Socket.IO

// -------------------- Types --------------------

type User = {
  id: string
  name: string
  avatar?: string
}

type Message = {
  id: string
  from: string
  text: string
  createdAt: string
  system?: boolean
}

type ChatRoom = {
  id: string
  name: string
  isGroup: boolean
  members: User[]
  lastMessage?: Message
}

// -------------------- Mock data (replace with API) --------------------

const CURRENT_USER: User = { id: "u1", name: "You" }

const MOCK_ROOMS: ChatRoom[] = [
  {
    id: "r1",
    name: "Dev Team",
    isGroup: true,
    members: [CURRENT_USER, { id: "u2", name: "Sita" }, { id: "u3", name: "Ram" }],
    lastMessage: { id: "m1", from: "u2", text: "Deployed!", createdAt: new Date().toISOString() },
  },
  {
    id: "r2",
    name: "Sita (1:1)",
    isGroup: false,
    members: [CURRENT_USER, { id: "u2", name: "Sita" }],
    lastMessage: { id: "m2", from: "u2", text: "On my way", createdAt: new Date().toISOString() },
  },
]

// -------------------- Hook: useChat --------------------

function useChat() {
  const [rooms, setRooms] = useState<ChatRoom[]>(MOCK_ROOMS)
  const [currentRoomId, setCurrentRoomId] = useState<string>(rooms[0].id)
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    r1: [
      { id: "m1", from: "u2", text: "Deployed!", createdAt: new Date().toISOString() },
      { id: "m3", from: "u1", text: "Nice 🎉", createdAt: new Date().toISOString() },
    ],
    r2: [
      { id: "m2", from: "u2", text: "On my way", createdAt: new Date().toISOString() },
    ],
  })

  // Placeholder: Connect to WebSocket or Socket.IO here
  useEffect(() => {
    // Example with Socket.IO (uncomment & install socket.io-client):
    // const socket = io(process.env.NEXT_PUBLIC_WS_URL as string, { auth: { token }})
    // socket.on("message", (msg) => setMessages(prev => ({ ...prev, [msg.roomId]: [...(prev[msg.roomId]||[]), msg] })))
    // return () => socket.disconnect()
  }, [])

  function selectRoom(id: string) {
    setCurrentRoomId(id)
  }

  function sendMessage(roomId: string, text: string) {
    const msg: Message = { id: Math.random().toString(36).slice(2), from: CURRENT_USER.id, text, createdAt: new Date().toISOString() }
    setMessages((prev) => ({ ...prev, [roomId]: [...(prev[roomId] || []), msg] }))
    // TODO: emit via socket / post to API
  }

  function createDirectChatWith(user: User) {
    // find if already exists
    const found = rooms.find((r) => !r.isGroup && r.members.some((m) => m.id === user.id))
    if (found) {
      setCurrentRoomId(found.id)
      return
    }

    const newRoom: ChatRoom = {
      id: `r_${Math.random().toString(36).slice(2)}`,
      name: `${user.name} (1:1)`,
      isGroup: false,
      members: [CURRENT_USER, user],
    }
    setRooms((rs) => [newRoom, ...rs])
    setMessages((m) => ({ ...m, [newRoom.id]: [] }))
    setCurrentRoomId(newRoom.id)
  }

  return { rooms, currentRoomId, messages, selectRoom, sendMessage, createDirectChatWith, setRooms }
}

// -------------------- UI components --------------------

function Avatar({ name, small = false }: { name: string; small?: boolean }) {
  return (
    <div className={`flex items-center justify-center rounded-full bg-gray-200 text-gray-700 ${small ? "w-8 h-8 text-sm" : "w-10 h-10 text-base"}`}>
      {name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
    </div>
  )
}

function ChatItem({ room, active, onClick }: { room: ChatRoom; active?: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`w-full text-left p-3 flex gap-3 items-start hover:bg-gray-50 ${active ? "bg-gray-100" : ""}`}>
      <Avatar name={room.name} />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div className="font-medium">{room.name}</div>
          <div className="text-xs text-gray-400">{room.lastMessage ? new Date(room.lastMessage.createdAt).toLocaleTimeString() : ""}</div>
        </div>
        <div className="text-sm text-gray-500 truncate">{room.lastMessage?.text || (room.isGroup ? `${room.members.length} members` : "No messages")}</div>
      </div>
    </button>
  )
}

function MessageBubble({ msg }: { msg: Message }) {
  const isMe = msg.from === CURRENT_USER.id
  return (
    <div className={`max-w-[80%] break-words ${isMe ? "self-end" : "self-start"}`}>
      <div className={`p-2 rounded-xl ${isMe ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-800"}`}>
        {msg.text}
      </div>
      <div className="text-[10px] text-gray-400 mt-1">{new Date(msg.createdAt).toLocaleTimeString()}</div>
    </div>
  )
}

function ChatListPane({ rooms, currentRoomId, onSelect, onStartDirect }: { rooms: ChatRoom[]; currentRoomId?: string; onSelect: (id: string) => void; onStartDirect: (user: User) => void }) {
  return (
    <div className="w-80 border-r min-h-screen p-2">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-3">
          <Avatar name={CURRENT_USER.name} small />
          <div>
            <div className="font-semibold">{CURRENT_USER.name}</div>
            <div className="text-xs text-gray-500">Online</div>
          </div>
        </div>
        <div>
          <button className="p-2 rounded hover:bg-gray-100">New</button>
        </div>
      </div>

      <div className="mt-4">
        <div className="px-2 text-xs text-gray-400">Chats</div>
        <div className="space-y-1 mt-2">
          {rooms.map((r) => (
            <ChatItem key={r.id} room={r} active={r.id === currentRoomId} onClick={() => onSelect(r.id)} />
          ))}
        </div>
      </div>

      <div className="mt-6 px-2">
        <div className="text-xs text-gray-400">Start chat</div>
        <div className="flex gap-2 mt-2">
          {/* Demo: start 1:1 with Ram or Sita */}
          <button onClick={() => onStartDirect({ id: "u3", name: "Ram" })} className="flex items-center gap-2 p-2 rounded w-full hover:bg-gray-50">
            <Avatar name="Ram" small /> Ram
          </button>
          <button onClick={() => onStartDirect({ id: "u2", name: "Sita" })} className="flex items-center gap-2 p-2 rounded w-full hover:bg-gray-50">
            <Avatar name="Sita" small /> Sita
          </button>
        </div>
      </div>
    </div>
  )
}

function ChatWindow({ room, messages, onSend }: { room: ChatRoom; messages: Message[]; onSend: (text: string) => void }) {
  const endRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <div className="border-b p-3 flex items-center gap-3">
        <Avatar name={room.name} />
        <div>
          <div className="font-semibold">{room.name}</div>
          <div className="text-xs text-gray-500">{room.isGroup ? `${room.members.length} members` : room.members.find((m) => m.id !== CURRENT_USER.id)?.name}</div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 flex flex-col gap-3">
        {messages.length === 0 && <div className="text-center text-gray-400 mt-8">No messages here yet. Say hi 👋</div>}
        {messages.map((m) => (
          <MessageBubble key={m.id} msg={m} />
        ))}
        <div ref={endRef} />
      </div>

      <div className="p-3 border-t">
        <MessageInput onSend={onSend} />
      </div>
    </div>
  )
}

function MessageInput({ onSend }: { onSend: (text: string) => void }) {
  const [val, setVal] = useState("")
  function submit() {
    if (!val.trim()) return
    onSend(val.trim())
    setVal("")
  }
  return (
    <div className="flex gap-2">
      <input value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} placeholder="Type a message" className="flex-1 p-2 rounded border" />
      <button onClick={submit} className="px-4 rounded bg-indigo-600 text-white">Send</button>
    </div>
  )
}

// -------------------- Main Dashboard --------------------

export default function ChatDashboard() {
  const { rooms, currentRoomId, messages, selectRoom, sendMessage, createDirectChatWith } = useChat()

  const room = rooms.find((r) => r.id === currentRoomId) || rooms[0]
  const roomMessages = messages[room.id] || []

  return (
    <div className="flex h-screen bg-white">
      <ChatListPane rooms={rooms} currentRoomId={currentRoomId} onSelect={selectRoom} onStartDirect={createDirectChatWith} />
      <div className="flex-1 flex">
        <ChatWindow room={room} messages={roomMessages} onSend={(text) => sendMessage(room.id, text)} />
        {/* Optional right pane: members / media / settings */}
        <div className="w-80 border-l p-4 hidden lg:block">
          <div className="font-semibold">Info</div>
          <div className="text-sm text-gray-600 mt-2">Members</div>
          <div className="mt-3 space-y-2">
            {room.members.map((m) => (
              <div className="flex items-center gap-3" key={m.id}>
                <Avatar name={m.name} small />
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-xs text-gray-500">Member</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/*
  Integration notes:
  - Replace mock data with API calls to fetch rooms and messages.
  - Use Socket.IO or WebSocket for real-time messages. In `useChat`, connect to socket,
    listen for `message` events and update state. Emit `message` when user sends.
  - For 1:1 chat creation, call backend to create/find direct room and return room id.
  - For persistence, POST messages to an API and rely on server to broadcast.
  - Authentication: include user token when connecting to socket and for API calls.

  File is intentionally single-component to be easy to paste into a Next.js page.
  If you want, I can:
   - Convert to separate files (components/hooks).
   - Add a Socket.IO server example (Node/Express).
   - Integrate with your existing group-room code — paste it and I'll adapt.
*/
