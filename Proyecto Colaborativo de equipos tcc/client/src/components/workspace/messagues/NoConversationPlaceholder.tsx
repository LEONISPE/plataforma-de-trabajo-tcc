import { MessageCircle } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="size-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
        <MessageCircle className="size-10 text-blue-500" />
      </div>

      <h3 className="text-xl font-semibold mb-2">
        Selecciona una conversación
      </h3>

      <p className="text-muted-foreground max-w-md">
        Elige un miembro del workspace para iniciar o continuar una conversación.
      </p>
    </div>
  );
};

export default NoConversationPlaceholder;