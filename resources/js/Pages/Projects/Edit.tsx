import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useState } from "react";

interface Project {
    id: number;
    title: string;
    body: string;
    description: string;
    url: string;
    repo: string;
    image: string;
    tags: string;
    created_at: string;
}

export default function Edit({ project }: PageProps<{ project: Project }>) {
    const [value, setValue] = useState(project.body);
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const [url, setUrl] = useState(project.url);
    const [repo, setRepo] = useState(project.repo);
    const [image, setImage] = useState(project.image);
    const [tags, setTags] = useState(project.tags);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formValues = {
            title,
            body: value,
            description,
            image,
            tags,
        };
        router.patch(route("projects.update", project.id), formValues);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Prosjekter redigering
                </h2>
            }
        >
            <Head title="Prosjekter" />

            <div className="py-12 text-gray-800 dark:text-gray-200">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                            Prosjekt: {project.title}
                        </h2>
                        <h3>ID: {project.id}</h3>
                        <form onSubmit={handleSubmit}>
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
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        className="w-full"
                                    />
                                    <InputLabel
                                        htmlFor="description"
                                        className="mt-4"
                                    >
                                        Beskrivelse
                                    </InputLabel>
                                    <textarea
                                        name="description"
                                        id="description"
                                        className="h-24 w-full rounded-md border border-neutral-300"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                    <span className="mt-4 block">Artikkel</span>
                                    <div className="mt-1 h-96">
                                        <ReactQuill
                                            theme="snow"
                                            value={value}
                                            onChange={setValue}
                                            className="h-full pb-10"
                                        />
                                    </div>
                                    <InputLabel htmlFor="url" className="mt-4">
                                        Url
                                    </InputLabel>
                                    <TextInput
                                        name="url"
                                        id="url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="w-full"
                                    />
                                    <InputLabel htmlFor="repo" className="mt-4">
                                        Github repo
                                    </InputLabel>
                                    <TextInput
                                        name="repo"
                                        id="repo"
                                        value={repo}
                                        onChange={(e) =>
                                            setRepo(e.target.value)
                                        }
                                        className="w-full"
                                    />
                                    <InputLabel htmlFor="repo" className="mt-4">
                                        Bilde
                                    </InputLabel>
                                    <TextInput
                                        name="image"
                                        id="image"
                                        value={image}
                                        onChange={(e) =>
                                            setImage(e.target.value)
                                        }
                                        className="w-full"
                                    />
                                    <InputLabel htmlFor="repo" className="mt-4">
                                        Tags
                                    </InputLabel>
                                    <TextInput
                                        name="tags"
                                        id="tags"
                                        value={tags}
                                        onChange={(e) =>
                                            setTags(e.target.value)
                                        }
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
