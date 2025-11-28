import Link from "next/link";

import clsx from "clsx";

interface ICardWrapperProps {
    children: React.ReactNode;
    type?: "basic" | "field";
    className?: string;
    href?: string;
}
function CardWrapper(props: ICardWrapperProps) {
    const { children, type = "basic", className } = props;
    if (type === "field") {
        return (
            <Link
                href={`${props.href}`}
                className={clsx(
                    "rounded-xl border bg-[#1E1E1E] border-[#343434] py-4 px-6",
                    className
                )}
            >
                {children}
            </Link>
        );
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
