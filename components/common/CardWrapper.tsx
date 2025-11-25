import clsx from "clsx";

interface ICardWrapperProps {
    children: React.ReactNode;
    type?: "basic" | "field";
    className?: string;
}
function CardWrapper(props: ICardWrapperProps) {
    const { children, type = "basic", className } = props;
    if (type === "field") {
        return <div>{children}</div>;
    }
    return (
        <div
            className={clsx("rounded-xl border bg-[#1E1E1E] border-[#343434] py-4 px-6", className)}
        >
            {children}
        </div>
    );
}

export default CardWrapper;
