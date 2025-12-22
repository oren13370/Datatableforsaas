import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface ApprovalUser {
  id: string;
  name: string;
}

interface ApprovalAvatarsProps {
  users: ApprovalUser[];
}

const getInitials = (name: string): string => {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const getAvatarColor = (name: string): string => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-teal-500",
  ];
  
  const hash = name.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
};

export function ApprovalAvatars({ users }: ApprovalAvatarsProps) {
  if (users.length === 0) {
    return <span className="text-slate-400 text-sm">—</span>;
  }

  const displayUsers = users.slice(0, 3);
  const remainingCount = users.length - 3;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center -space-x-2 cursor-pointer">
          {displayUsers.map((user) => (
            <div
              key={user.id}
              className={`size-8 rounded-full ${getAvatarColor(user.name)} flex items-center justify-center text-white text-xs border-2 border-white hover:z-10 transition-transform hover:scale-110`}
              title={user.name}
            >
              {getInitials(user.name)}
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="size-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs border-2 border-white hover:z-10 transition-transform hover:scale-110">
              +{remainingCount}
            </div>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <div className="space-y-1">
          <div className="font-medium mb-2">Approved by ({users.length})</div>
          {users.map((user) => (
            <div key={user.id} className="text-sm">
              {user.name}
            </div>
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
