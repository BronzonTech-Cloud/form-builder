"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForms } from "@/lib/form";
import { CreateFormSchema, CreateFormValues } from "@/lib/schema";
import { FormField } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Trash2Icon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateForm = () => {

    const router = useRouter();

    const { addForm } = useForms();

    const [fields, setFields] = useState<FormField[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<CreateFormValues>({
        resolver: zodResolver(CreateFormSchema),
        defaultValues: {
            name: "",
            fields: [],
        },
    });

    const addField = (type: FormField["type"]) => {
        const newField: FormField = {
            id: crypto.randomUUID(),
            type,
            label: "",
            name: "",
            required: false,
            options: type === "dropdown" || type === "radio" ? [""] : undefined,
        };
        // local state is the state that is managed by the component itself, while form state values are managed by the useForm hook
        setFields((prev) => [...prev, newField]); // update local state
        setValue("fields", [...fields, newField]); // update form state values
    };

    const updateField = (id: string, updates: Partial<FormField>) => {
        const updatedFields = fields.map((field) =>
            field.id === id ? { ...field, ...updates } : field
        );
        setFields(updatedFields);
        setValue("fields", updatedFields);
    };

    const removeField = (id: string) => {
        const updatedFields = fields.filter((field) => field.id !== id);
        setFields(updatedFields);
        setValue("fields", updatedFields);
    };

    const onSubmit = (data: CreateFormValues) => {
        try {
            addForm({
                name: data.name,
                fields: data.fields,
                userId: crypto.randomUUID(),
            });
            toast.success("Form created successfully");
            router.push("/forms");
        } catch (error) {
            toast.error("Failed to create form");
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-10">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Form Name
                    </label>
                    <Input
                        {...register("name")}
                        placeholder="Enter form name"
                        className="max-w-md"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <Button
                            type="button"
                            onClick={() => addField("text")}
                            variant="outline"
                        >
                            <PlusCircle className="size-4" />
                            Text Field
                        </Button>
                        <Button
                            type="button"
                            onClick={() => addField("number")}
                            variant="outline"
                        >
                            <PlusCircle className="size-4" />
                            Number Field
                        </Button>
                        <Button
                            type="button"
                            onClick={() => addField("dropdown")}
                            variant="outline"
                        >
                            <PlusCircle className="size-4" />
                            Dropdown
                        </Button>
                        <Button
                            type="button"
                            onClick={() => addField("radio")}
                            variant="outline"
                        >
                            <PlusCircle className="size-4" />
                            Radio
                        </Button>
                        <Button
                            type="button"
                            onClick={() => addField("checkbox")}
                            variant="outline"
                        >
                            <PlusCircle className="size-4" />
                            Checkbox
                        </Button>
                    </div>

                    {errors.fields && (
                        <p className="text-red-500 text-sm">{errors.fields.message}</p>
                    )}

                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="border rounded-lg p-4 space-y-4 relative"
                        >
                            <Button
                                size="icon"
                                type="button"
                                variant="destructive"
                                className="absolute top-2 right-2 text-destructive bg-destructive/10 hover:bg-destructive/30"
                                onClick={() => removeField(field.id)}
                            >
                                <Trash2Icon className="size-4" />
                            </Button>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Label
                                    </label>
                                    <Input
                                        {...register(`fields.${index}.label`)}
                                        value={field.label}
                                        onChange={(e) =>
                                            updateField(field.id, { label: e.target.value })
                                        }
                                        placeholder="Enter field label"
                                    />
                                    {errors.fields?.[index]?.label && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.fields[index]?.label?.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Name (key)
                                    </label>
                                    <Input
                                        {...register(`fields.${index}.name`)}
                                        value={field.name}
                                        onChange={(e) =>
                                            updateField(field.id, { name: e.target.value })
                                        }
                                        placeholder="Enter field name"
                                    />
                                    {errors.fields?.[index]?.name && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.fields[index]?.name?.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {(field.type === "dropdown" || field.type === "radio") && (
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Options
                                    </label>
                                    <div className="space-y-2">
                                        {field.options?.map((option, optionIndex) => (
                                            <div key={optionIndex} className="flex gap-2">
                                                <Input
                                                    {...register(`fields.${index}.options.${optionIndex}`)}
                                                    value={option}
                                                    onChange={(e) => {
                                                        const newOptions = [...(field.options || [])];
                                                        newOptions[optionIndex] = e.target.value;
                                                        updateField(field.id, { options: newOptions });
                                                    }}
                                                    placeholder={`Option ${optionIndex + 1}`}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => {
                                                        const newOptions = [...(field.options || [])];
                                                        newOptions.splice(optionIndex, 1);
                                                        updateField(field.id, { options: newOptions });
                                                    }}
                                                >
                                                    <X className="size-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                const newOptions = [...(field.options || []), ""];
                                                updateField(field.id, { options: newOptions });
                                            }}
                                        >
                                            Add Option
                                        </Button>
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Validation
                                </label>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            {...register(`fields.${index}.required`)}
                                            checked={field.required}
                                            onChange={(e) =>
                                                updateField(field.id, { required: e.target.checked })
                                            }
                                        />
                                        <span className="text-sm">Required</span>
                                    </div>

                                    {field.type === "text" && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Min Length
                                                </label>
                                                <Input
                                                    type="number"
                                                    {...register(`fields.${index}.validation.minLength`)}
                                                    value={field.validation?.minLength || ""}
                                                    onChange={(e) =>
                                                        updateField(field.id, {
                                                            validation: {
                                                                ...field.validation,
                                                                minLength: parseInt(e.target.value) || undefined,
                                                            },
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Max Length
                                                </label>
                                                <Input
                                                    type="number"
                                                    {...register(`fields.${index}.validation.maxLength`)}
                                                    value={field.validation?.maxLength || ""}
                                                    onChange={(e) =>
                                                        updateField(field.id, {
                                                            validation: {
                                                                ...field.validation,
                                                                maxLength: parseInt(e.target.value) || undefined,
                                                            },
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {field.type === "number" && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Min Value
                                                </label>
                                                <Input
                                                    type="number"
                                                    {...register(`fields.${index}.validation.min`)}
                                                    value={field.validation?.min || ""}
                                                    onChange={(e) =>
                                                        updateField(field.id, {
                                                            validation: {
                                                                ...field.validation,
                                                                min: parseInt(e.target.value) || undefined,
                                                            },
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Max Value
                                                </label>
                                                <Input
                                                    type="number"
                                                    {...register(`fields.${index}.validation.max`)}
                                                    value={field.validation?.max || ""}
                                                    onChange={(e) =>
                                                        updateField(field.id, {
                                                            validation: {
                                                                ...field.validation,
                                                                max: parseInt(e.target.value) || undefined,
                                                            },
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Button type="submit">
                    Create form
                </Button>
            </form>
        </div>
    )
}

export default CreateForm
