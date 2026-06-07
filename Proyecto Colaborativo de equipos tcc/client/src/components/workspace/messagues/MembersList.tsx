import { Loader } from "lucide-react";

import useWorkspaceId from "@/hooks/use-workspace-id";
import useGetWorkspaceMembers from "@/hooks/api/use-get-workspace-members";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  getAvatarColor,
  getAvatarFallbackText,
} from "@/lib/helper";

type Props = {
  setSelectedMember: (member: any) => void;
};

const MembersList = ({
  setSelectedMember,
}: Props) => {
  const workspaceId = useWorkspaceId();

  const { data, isPending } =
    useGetWorkspaceMembers(workspaceId);

  const members = data?.members || [];

  if (isPending) {
    return (
      <div className="flex justify-center p-5">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-3 space-y-2">
      {members.map((member) => {
        const name = member.userId?.name;

        const initials =
          getAvatarFallbackText(name);

        const avatarColor =
          getAvatarColor(name);

        return (
          <button
  key={member._id}
  onClick={() =>
    setSelectedMember(member.userId)
  }
  className="
  w-full
  flex
  items-center
  gap-3
  p-3
  rounded-lg
  hover:bg-muted
  transition
  "
>
            <Avatar>
              <AvatarImage
                src={
                  member.userId?.profilePicture || ""
                }
              />

              <AvatarFallback
                className={avatarColor}
              >
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="text-left">
              <p className="font-medium">
                {name}
              </p>

              <p className="text-xs text-muted-foreground">
                {member.userId?.email}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default MembersList;