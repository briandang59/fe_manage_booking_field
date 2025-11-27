import { Avatar } from "antd";
import { Star } from "lucide-react";

import { getTimeAgo } from "@/utils/functions/getTimeAgo";

import CardWrapper from "./CardWrapper";
import UserAvatar from "./UserAvatar";

interface IUserReviewProps {
    avatar_url: string;
    full_name: string;
    created_at: string;
    rating_star: number;
    description: string;
}
function UserReview(props: IUserReviewProps) {
    return (
        <CardWrapper className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <UserAvatar
                    avatar_url={props.avatar_url}
                    created_at={props.created_at}
                    full_name={props.full_name}
                />
                <div className="flex items-center gap-4">
                    <p className="text-[18px]">{props.rating_star}</p>
                    <Star size={18} />
                </div>
            </div>
            <p className="text-gray-300 text-[16px]">{props.description}</p>
        </CardWrapper>
    );
}

export default UserReview;
