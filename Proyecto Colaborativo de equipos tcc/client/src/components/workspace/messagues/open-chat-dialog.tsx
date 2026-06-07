import { useState } from "react";
import { MessageCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import ChatPage from "./chat-page";

const OpenChatDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          flex
          items-center
          gap-2
          "
        >
          <MessageCircle size={18} />
          Mensajes
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-7xl h-[85vh] p-0 overflow-hidden">
        <ChatPage />
      </DialogContent>
    </Dialog>
  );
};

export default OpenChatDialog;