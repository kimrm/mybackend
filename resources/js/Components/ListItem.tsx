import React from "react";

export default function ListItem({ children }: { children: React.ReactNode }) {
    return <li className="rounded bg-neutral-100 p-4">{children}</li>;
}
