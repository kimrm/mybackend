import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";

interface Token {
    name: string;
    created_at: string;
    expires_at: string;
}

export default function Edit({ tokens }: PageProps<{ tokens: Token[] }>) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("api.store"));
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    API settings
                </h2>
            }
        >
            <Head title="API tokens" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                            API tokens
                        </h3>
                        <p>
                            API tokens allow third-party services to
                            authenticate with our application on your behalf.
                        </p>
                        {tokens.length > 0 ? (
                            <ul>
                                {tokens.map((token) => (
                                    <li
                                        key={token.name}
                                        className="flex items-center justify-between py-2"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                                {token.name}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Created: {token.created_at}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Expires: {token.expires_at}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No API tokens found.</p>
                        )}
                        <div className="mt-4 space-x-2">
                            <form onSubmit={submit}>
                                <label htmlFor="name">Name</label>
                                <TextInput
                                    name="name"
                                    type="text"
                                    value={data?.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing || !data.name}
                                >
                                    Create a new token
                                </PrimaryButton>
                            </form>
                            {errors && (
                                <ul>
                                    {errors.name && (
                                        <li key={errors.name}>{errors.name}</li>
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
