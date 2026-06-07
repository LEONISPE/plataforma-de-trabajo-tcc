
type Props = {
  children: React.ReactNode;
};

const BorderAnimatedContainer = ({ children }: Props) => {
  return (
    <div
      className="
      w-full
      h-full
      rounded-xl
      border
      overflow-hidden
      flex
      "
    >
      {children}
    </div>
  );
};

export default BorderAnimatedContainer;