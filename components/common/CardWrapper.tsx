interface ICardWrapperProps {
    children: React.ReactNode;
    type?: "basic" | "field";
}
function CardWrapper({ children, type = "basic" }: ICardWrapperProps) {
    if (type === "field") {
        return <div>{children}</div>;
    }
    return (
        <div className="rounded-[12px] border bg-[#1F2D1C] border-[#364133] p-4 text-[14px]">
            {children}
        </div>
    );
}

export default CardWrapper;
