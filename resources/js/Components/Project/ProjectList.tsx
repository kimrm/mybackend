import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    DragEndEvent,
    DragStartEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    useSortable,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ProjectCard from "@/Components/Project/ProjectCard";
import { PropsWithChildren, useState } from "react";
import { Project } from "@/types";
import { Link } from "@inertiajs/react";

const ProjectDraggable = ({
    id,
    children,
}: {
    id: string;
    children: React.ReactNode;
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : "auto",
    };

    return (
        <li
            className="relative cursor-default rounded-md bg-slate-100 p-4 dark:bg-neutral-900"
            ref={setNodeRef}
            style={style}
            {...attributes} // Bare nødvendig for å koble elementet til dnd-kit
        >
            <div className="absolute right-2 top-2 flex space-x-5">
                <Link
                    className="dark:neutral-800 text-neutral-50"
                    href={route("projects.edit", id)}
                >
                    <svg
                        fill="none"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                    </svg>
                </Link>
                <svg
                    id="drag-handle"
                    data-drag-handle
                    aria-label="Reorder"
                    fill="none"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="dark:neutral-800 h-6 w-6 cursor-grab text-neutral-50" // Legg til spesifikk cursor her
                    {...listeners} // Koble bare listeners til SVG-en
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                    />
                </svg>
            </div>
            {children}
        </li>
    );
};

export default function ProjectList({
    projects,
    setProjects,
    updatedCallback,
}: PropsWithChildren<{
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    updatedCallback: (projectsList: Project[]) => void;
}>) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const [activeId, setActiveId] = useState<string | null>(null);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id.toString());
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        setActiveId(null);

        if (active.id !== over?.id) {
            setProjects((prevProjects) => {
                const oldIndex = prevProjects.findIndex(
                    (p) => p.id.toString() === active.id.toString(),
                );
                const newIndex = prevProjects.findIndex(
                    (p) => p.id.toString() === over?.id.toString(),
                );

                const updatedProjects = arrayMove(
                    prevProjects,
                    oldIndex,
                    newIndex,
                );

                const rearrangedProjects = updatedProjects.map(
                    (project, index) => {
                        return {
                            ...project,
                            sort: index + 1,
                        };
                    },
                );

                updatedCallback(rearrangedProjects);

                return updatedProjects;
            });
        }
    };

    const handleDragCancel = () => {
        setActiveId(null);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <SortableContext items={projects.map((project) => project.id)}>
                <ul className="mt-4 space-y-4">
                    {projects.map((project) => (
                        <ProjectDraggable
                            key={project.id}
                            id={project.id.toString()}
                        >
                            <ProjectCard project={project} />
                        </ProjectDraggable>
                    ))}
                </ul>
            </SortableContext>

            {/* Drag overlay */}
            <DragOverlay>
                {activeId ? (
                    <div className="rounded-md bg-slate-100 p-4">
                        <ProjectCard
                            project={
                                projects.find(
                                    (project) =>
                                        project.id.toString() === activeId,
                                ) || {
                                    id: 0,
                                    title: "",
                                    description: "",
                                    created_at: "",
                                    model: "",
                                    model_id: 0,
                                    sort: 0,
                                    author: { id: 0, name: "" },
                                } // Provide a default project object
                            }
                        />
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
