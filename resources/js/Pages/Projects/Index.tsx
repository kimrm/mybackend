import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps, Project } from "@/types";
import { useState } from "react";
import ProjectList from "@/Components/Project/ProjectList";
import axios from "axios";

export default function Index({
    projects,
}: PageProps<{ projects: Project[] }>) {
    const [projectsList, setProjectsList] = useState<Project[]>(projects);

    const updateSortingBackend = (projectsList: Project[]) => {
        axios
            .post(route("sort.store"), { projects: projectsList })
            .then((response) => console.log(response.data))
            .catch((error) => console.error("Error:", error));
    };
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
                        <p>
                            Her finner du en oversikt over alle prosjektene du
                            har tilgang til. De vises i den rekkefølgen de vises
                            på din hjemmeside.
                        </p>
                        <ProjectList
                            projects={projectsList}
                            setProjects={setProjectsList}
                            updatedCallback={updateSortingBackend}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
