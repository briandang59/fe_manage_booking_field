import CardWrapper from "@/components/common/CardWrapper";
import ContainerWrapper from "@/components/common/ContainerWrapper";

export default function Home() {
    return (
        <div>
            <ContainerWrapper className="grid grid-cols-4 gap-4">
                <CardWrapper>123</CardWrapper>
                <CardWrapper>123</CardWrapper>
                <CardWrapper>123</CardWrapper>
                <CardWrapper>123</CardWrapper>
            </ContainerWrapper>
        </div>
    );
}
