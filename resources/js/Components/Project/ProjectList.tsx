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
        opacity: isDragging ? 0.5 : 1, // Gjør elementet mer transparent når det dras
        zIndex: isDragging ? 10 : "auto", // Sørg for at det dras "over" andre elementer
    };

    return (
        <li
            className="bg-slate-100"
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
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
                    <div className="rounded-md bg-slate-200 p-4">
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
