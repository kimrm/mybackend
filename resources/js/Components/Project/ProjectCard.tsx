import { dateFormat } from "@/helpers";
import { Project } from "@/types";

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <article>
            <div className="text-gray-900 dark:text-gray-50">
                <h3 className="mb-2 text-xl font-medium leading-6">
                    {project.title}
                </h3>
                <p className="mb-2 max-w-prose">{project.description}</p>
                <p>
                    Opprettet: {dateFormat(project.created_at)}, av{" "}
                    {project.author.name}
                </p>
            </div>
        </article>
    );
}
