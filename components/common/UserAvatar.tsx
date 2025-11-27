import { Avatar } from "antd";

import { getTimeAgo } from "@/utils/functions/getTimeAgo";

interface IUserAvatarProps {
    avatar_url: string;
    full_name: string;
    created_at: string;
}
function UserAvatar(props: IUserAvatarProps) {
    return (
        <div className="flex items-center gap-4">
            <Avatar src={props.avatar_url} alt="avatar" size={50} />
            <div className="flex flex-col gap-2">
                <p className="text-[16px] font-medium">{props.full_name}</p>
                <p className="text-gray-400 text-[14px]">{getTimeAgo(props.created_at)}</p>
            </div>
        </div>
    );
}

export default UserAvatar;
