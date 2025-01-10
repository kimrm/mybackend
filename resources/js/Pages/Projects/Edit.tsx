import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";

interface Project {
    id: number;
    title: string;
    description: string;
    created_at: string;
}

export default function Edit({ project }: PageProps<{ project: Project }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Prosjekter redigering
                </h2>
            }
        >
            <Head title="Prosjekter" />

            <div className="py-12 text-gray-200">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                            Prosjekt: {project.title}
                        </h2>
                        <h3>ID: {project.id}</h3>
                        <form action="">
                            <div className="grid grid-cols-6">
                                <div className="col-span-4">
                                    <InputLabel
                                        htmlFor="title"
                                        className="mb-1 mt-4"
                                    >
                                        Tittel
                                    </InputLabel>
                                    <TextInput
                                        name="title"
                                        id="title"
                                        value={project.title}
                                        className="w-full"
                                    />
                                    <div className="mt-4">
                                        <PrimaryButton className="mt-4">
                                            Lagre
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
