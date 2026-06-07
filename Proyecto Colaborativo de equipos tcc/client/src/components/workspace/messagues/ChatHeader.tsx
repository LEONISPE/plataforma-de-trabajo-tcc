type Props = {
  selectedMember: any;
  isOnline: boolean;
};

const ChatHeader = ({
   selectedMember,
  isOnline,
}: Props) => {
  return (
    <div
      className="
      border-b
      p-4
      flex
      items-center
      justify-between
      "
    >
      <div>
        <h3 className="font-semibold">
          {selectedMember.name}
        </h3>

        <p className="text-xs text-muted-foreground">
  {isOnline
    ? "🟢 En línea"
    : "⚫ Desconectado"}
</p>
      </div>
    </div>
  );
};

export default ChatHeader;