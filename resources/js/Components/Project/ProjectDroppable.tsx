import { useDroppable } from "@dnd-kit/core";

export default function ProjectDroppable({
    children,
}: React.PropsWithChildren) {
    const { isOver, setNodeRef } = useDroppable({
        id: "droppable",
    });
    return (
        <div
            ref={setNodeRef}
            className={`${isOver ? "bg-green-100" : "bg-neutral-500"} p-4`}
        >
            {children}
        </div>
    );
}
