import CardWrapper from "./CardWrapper";
import UserAvatar from "./UserAvatar";
import UserTag from "./UserTag";

interface IUserPostProps {
    avatar_url: string;
    full_name: string;
    created_at: string;
    description: string;
    tag: string;
}
function UserPost(props: IUserPostProps) {
    return (
        <CardWrapper className="flex flex-col gap-8 min-h-[150px]">
            <div className="flex items-center justify-between">
                <UserAvatar
                    avatar_url={props.avatar_url}
                    created_at={props.created_at}
                    full_name={props.full_name}
                />
                <UserTag className="p-1! rounded-full! text-[12px] text-[#39FF14] bg-[#234B1C]!">
                    {props.tag}
                </UserTag>
            </div>
            <p className="text-[14px] font-medium text-gray-300">{props.description}</p>
        </CardWrapper>
    );
}

export default UserPost;
