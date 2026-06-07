import BorderAnimatedContainer from "./BorderAnimatedContainer";
import MembersList from "./MembersList";
import NoConversationPlaceholder from "./NoConversationPlaceholder";
import { useState } from "react";
import ChatContainer from "./ChatContainer"

const ChatPage = () => {

const [selectedMember, setSelectedMember] = useState<any>(null);


  return (
    <div className="w-full h-full">
      <BorderAnimatedContainer>

        {/* Sidebar */}
        <div className="w-80 border-r bg-muted/20">
          <div className="p-4 border-b">
            <h2 className="font-semibold">
              Miembros
            </h2>
          </div>

          <MembersList
  setSelectedMember={setSelectedMember}
/>
        </div>

        {/* Conversación */}

        <div className="flex-1 overflow-hidden">

  {selectedMember ? (
  <ChatContainer
    selectedMember={selectedMember}
  />
) : (
  <NoConversationPlaceholder />
)}

</div>

      </BorderAnimatedContainer>
    </div>
  );
};

export default ChatPage;