import { useEffect, useState } from "react";

import { useAuthContext } from "@/context/auth-provider";
import { useRef } from "react";

import useWorkspaceId from "@/hooks/use-workspace-id";

import { getMessagesFn,sendMessageFn  } from "@/lib/api";

import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { socket } from "@/lib/socket";


type Props = {
  selectedMember: any;
};



const ChatContainer = ({
  selectedMember,
}: Props) => {
  const workspaceId = useWorkspaceId();

  const messagesEndRef =
  useRef<HTMLDivElement>(null);

  const [onlineUsers, setOnlineUsers] =
  useState<string[]>([]);

  const { user } = useAuthContext();

  const [messages, setMessages] = useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);


    useEffect(() => {
  console.log(
    "onlineUsers actualizado:",
    onlineUsers
  );
}, [onlineUsers]);

useEffect(() => {

  const handleOnlineUsers = (
  users: string[]
) => {

  console.log(
    "ONLINE USERS RECIBIDOS:",
    users
  );

  setOnlineUsers(users);

  console.log(
    "selectedMember actual:",
    selectedMember?._id
  );
};

  socket.on(
    "online-users",
    handleOnlineUsers
  );

  return () => {
    socket.off(
      "online-users",
      handleOnlineUsers
    );
  };

}, []);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);

        const response =
          await getMessagesFn(
            workspaceId,
            selectedMember._id
          );

        setMessages(response.data || []);
        setTimeout(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, 100);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [workspaceId, selectedMember]);


  useEffect(() => {
  const handleNewMessage = (
    message: any
  ) => {

    if (
      message.senderId === selectedMember._id ||
      message.receiverId === selectedMember._id
    ) {

      setMessages((prev) => [
        ...prev,
        message,
      ]);

      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  };

  socket.on(
    "new-message",
    handleNewMessage
  );

  return () => {
    socket.off(
      "new-message",
      handleNewMessage
    );
  };
}, [selectedMember]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        Cargando mensajes...
      </div>
    );
  }

  const handleSendMessage = async (
  content: string
) => {
  const response =
    await sendMessageFn({
      workspaceId,
      receiverId: selectedMember._id,
      content,
    });

  setMessages((prev) => [
    ...prev,
    response.data,
  ]);

  setTimeout(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, 100);
};

console.log(
  "selectedMember completo:",
  selectedMember
);

console.log(
  "selectedMember._id:",
  selectedMember._id
);

console.log(
  "onlineUsers:",
  onlineUsers
);



const isOnline =
  onlineUsers.includes(
    selectedMember._id
  );
  console.log(
  "Miembro seleccionado:",
  selectedMember._id
);

console.log(
  "Está online:",
  onlineUsers.includes(
    selectedMember._id
  )
);

 return (
  <div className="flex flex-col h-[500px]">

    <ChatHeader
  selectedMember={selectedMember}
  isOnline={isOnline}
/>

   <div
  className="
  flex-1
  min-h-0
  overflow-y-auto
  p-4
  space-y-4
  bg-slate-50
  "
>
  {messages.map((msg) => (
    <div
      key={msg._id}
      className={
        msg.senderId === user?._id
          ? "flex justify-end"
          : "flex justify-start"
      }
    >
      <div
  className={`
    max-w-[70%]
    rounded-2xl
    px-4
    py-2
    shadow-sm
    ${
      msg.senderId === user?._id
        ? "bg-blue-600 text-white"
        : "bg-slate-200 text-slate-900"
    }
  `}
>
        <p>{msg.content}</p>

        <p
  className={`
    text-xs
    mt-1
    ${
      msg.senderId === user?._id
        ? "text-blue-100"
        : "text-slate-500"
    }
  `}
>
          {new Date(
  msg.createdAt
).toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
})}
        </p>
      </div>
    </div>
  ))}

  <div ref={messagesEndRef} />
</div>

    <MessageInput
      onSend={handleSendMessage}
    />

  </div>
);
};

export default ChatContainer;