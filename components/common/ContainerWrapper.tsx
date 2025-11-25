import React from "react";

import clsx from "clsx";

interface IContainerWrapperProps {
    children: React.ReactNode;
    className?: string;
}

function ContainerWrapper(props: IContainerWrapperProps) {
    return (
        <div
            className={clsx(
                "container mx-auto 2xl:max-w-[1400px] xl:max-w-[1200px] max-w-full",
                props.className
            )}
        >
            {props.children}
        </div>
    );
}

export default ContainerWrapper;
