import { useState } from "react";

const MessageInput = ({
  onSend,
}: {
  onSend: (text: string) => void;
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t flex gap-2"
    >
      <input
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        placeholder="Escribe un mensaje..."
       className="
flex-1
border
rounded-lg
px-4
py-2
focus:outline-none
focus:ring-2
focus:ring-blue-500
"
      />

      <button
  type="submit"
  className="
  bg-blue-600
  hover:bg-blue-700
  text-white
  px-5
  py-2
  rounded-lg
  transition
  "
>
  Enviar
</button>
    </form>
  );
};

export default MessageInput;