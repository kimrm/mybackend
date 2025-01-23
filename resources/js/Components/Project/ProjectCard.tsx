import { dateFormat } from "@/helpers";
import { Project } from "@/types";
import { Link } from "@inertiajs/react";

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <article className={`relative`}>
            <div className="absolute right-0 top-0 flex space-x-5 rounded-bl-lg">
                <Link href={route("projects.edit", project.id)}>
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
                <button>
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
                            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                        />
                    </svg>
                </button>
            </div>
            <h3 className="mb-2 text-xl font-medium leading-6 text-gray-900 dark:text-gray-200">
                {project.title}
            </h3>
            <p className="mb-2 max-w-prose">{project.description}</p>
            <p>
                Opprettet: {dateFormat(project.created_at)}, av{" "}
                {project.author.name}
            </p>
            <p>
                Modell: {project.model} (ID: {project.model_id}) Sort:{" "}
                {project.sort}
            </p>
        </article>
    );
}
