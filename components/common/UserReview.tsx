import { Avatar } from "antd";
import { Star } from "lucide-react";

import { getTimeAgo } from "@/utils/functions/getTimeAgo";

import CardWrapper from "./CardWrapper";

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
                <div className="flex items-center gap-4">
                    <Avatar src={props.avatar_url} alt="avatar" size={50} />
                    <div className="flex flex-col gap-2">
                        <p className="text-[16px] font-medium">{props.full_name}</p>
                        <p className="text-gray-400 text-[14px]">{getTimeAgo(props.created_at)}</p>
                    </div>
                </div>
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
