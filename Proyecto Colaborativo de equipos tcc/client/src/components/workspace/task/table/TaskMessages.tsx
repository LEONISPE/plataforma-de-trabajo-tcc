import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMessagesFn, sendMessageFn } from "@/lib/api";
import { socket } from "@/lib/socket"; // tu conexión socket
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  workspaceId: string;
  otherUserId: string;
}

export default function TaskMessages({
  isOpen,
  onClose,
  workspaceId,
  otherUserId,
}: Props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  // 🔹 Obtener mensajes iniciales
  const { data } = useQuery({
    queryKey: ["messages", workspaceId, otherUserId],
    queryFn: () => getMessagesFn(workspaceId, otherUserId),
    enabled: isOpen,
  });

  useEffect(() => {
    if (data?.data) {
      setMessages(data.data);
    }
  }, [data]);

  useEffect(() => {
  const handleMessage = (msg: any) => {
    setMessages((prev) => [...prev, msg.data]);
  };

  socket.on("new-message", handleMessage);

  return () => {
    socket.off("new-message", handleMessage);
  };
}, [workspaceId, otherUserId]);

  // 🔹 Enviar mensaje
  const handleSend = async () => {
    if (!message.trim()) return;

    const res = await sendMessageFn({
      workspaceId,
      receiverId: otherUserId,
      content: message,
    });

    setMessages((prev) => [...prev, res.data]);
    setMessage("");
  };

 return (
  <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="max-w-md p-0 bg-[#0f172a] border border-[#1e293b]">

    {/* 🔹 HEADER */}
    <DialogHeader className="px-4 py-3 border-b border-[#1e293b] bg-[#1e3a8a]">
      <DialogTitle className="text-sm text-white">
        💬 Mensajes
      </DialogTitle>
    </DialogHeader>

    {/* 🔹 MENSAJES */}
    <div className="h-72 overflow-y-auto p-3 bg-[#020617] space-y-2">
      {messages.map((msg, i) => (
        <div
          key={i}
          className="text-sm text-white bg-[#1e293b] px-3 py-2 rounded w-fit max-w-[80%]"
        >
          {msg.content}
        </div>
      ))}
    </div>

    {/* 🔹 INPUT */}
    <div className="flex gap-2 p-3 border-t border-[#1e293b] bg-[#0f172a]">
      <input
        className="flex-1 px-3 py-2 text-sm rounded bg-[#020617] border border-[#1e293b] text-white focus:outline-none focus:border-blue-500"
        placeholder="Escribe un mensaje..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      <button
        onClick={handleSend}
        className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded text-white"
      >
        Enviar
      </button>
    </div>

  </DialogContent>
</Dialog>
);
}