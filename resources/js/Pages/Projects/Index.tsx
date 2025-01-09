import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

interface Project {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

export default function Index({
    projects,
}: PageProps<{ projects: Project[] }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Prosjekter
                </h2>
            }
        >
            <Head title="Prosjekter" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                            Prosjekter
                        </h2>
                        <ul>
                            {projects.map((project) => (
                                <li key={project.id}>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                                        {project.name}
                                    </h3>
                                    <p>{project.description}</p>
                                    <p>Opprettet: {project.created_at}</p>
                                </li>
                            ))}
                            ;
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
