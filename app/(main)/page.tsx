import ContainerWrapper from "@/components/common/ContainerWrapper";
import UserReview from "@/components/common/UserReview";
import { reviews } from "@/utils/mock-datas/reviews";

export default function Home() {
    return (
        <div>
            <ContainerWrapper className="grid grid-cols-2 gap-4">
                {reviews.map((item, index) => (
                    <UserReview
                        avatar_url={item?.avatar_url}
                        created_at={item?.created_at}
                        description={item?.description}
                        full_name={item?.full_name}
                        rating_star={item?.star}
                        key={index}
                    />
                ))}
            </ContainerWrapper>
        </div>
    );
}
