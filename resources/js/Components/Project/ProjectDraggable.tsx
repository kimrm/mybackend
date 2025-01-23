import { useDraggable } from "@dnd-kit/core";

export default function ProjectDraggable({
    children,
}: React.PropsWithChildren) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: "draggable",
    });
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;
    return (
        <div style={style} ref={setNodeRef} {...listeners} {...attributes}>
            {children}
        </div>
    );
}
