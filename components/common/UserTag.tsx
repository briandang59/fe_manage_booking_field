import React from "react";

import clsx from "clsx";

interface IUserTagProps {
    children: React.ReactNode;
    className?: string;
}
function UserTag(props: IUserTagProps) {
    return (
        <div
            className={clsx("bg-[#252525] p-4 rounded-xl border border-[#313131]", props.className)}
        >
            {props.children}
        </div>
    );
}

export default UserTag;
