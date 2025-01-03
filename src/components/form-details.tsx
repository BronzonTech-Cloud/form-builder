"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForms } from "@/lib/form";
import { FormField } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const generateValidationSchema = (fields: FormField[]) => {
    const schemaFields: Record<string, z.ZodTypeAny> = {};

    fields.forEach((field: FormField) => {
        let fieldSchema: z.ZodTypeAny;

        switch (field.type) {
            case "text":
                fieldSchema = z.string();
                if (field.validation?.minLength) {
                    fieldSchema = (fieldSchema as z.ZodString).min(field.validation.minLength,
                        `Minimum ${field.validation.minLength} characters required`);
                }
                if (field.validation?.maxLength) {
                    fieldSchema = (fieldSchema as z.ZodString).max(field.validation.maxLength,
                        `Maximum ${field.validation.maxLength} characters allowed`);
                }
                break;

            case "number":
                fieldSchema = z.number();
                if (field.validation?.min !== undefined) {
                    fieldSchema = (fieldSchema as z.ZodString).min(field.validation.min,
                        `Minimum value is ${field.validation.min}`);
                }
                if (field.validation?.max !== undefined) {
                    fieldSchema = (fieldSchema as z.ZodString).max(field.validation.max,
                        `Maximum value is ${field.validation.max}`);
                }
                break;

            case "dropdown":
            case "radio":
                fieldSchema = z.string();
                if (field.options) {
                    fieldSchema = z.enum([...field.options] as [string, ...string[]]);
                }
                break;

            case "checkbox":
                fieldSchema = z.boolean();
                break;

            default:
                fieldSchema = z.string();
        }

        if (field.required) {
            schemaFields[field.name] = fieldSchema;
        } else {
            schemaFields[field.name] = fieldSchema.optional();
        }
    });

    return z.object(schemaFields);
};


const FormDetails = () => {

    const params = useParams();

    const formId = params.id as string;
    const form = useForms().getForm(formId);

    if (!form) {
        return (
            <div className="flex flex-col items-center justify-center mt-20">
                <h4 className="text-lg font-medium text-center">
                    Form not found
                </h4>
            </div>
        );
    };

    const validationSchema = useMemo(() =>
        generateValidationSchema(form.fields), [form.fields]);

    type FormSchema = z.infer<typeof validationSchema>;

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: useMemo(() => {
            const defaults: Record<string, any> = {};
            form.fields.forEach(field => {
                defaults[field.name] = field.type === "checkbox" ? false : "";
            });
            return defaults;
        }, [form.fields]),
    });

    const handleSelectChange = (name: string, value: string) => {
        setValue(name, value, { shouldValidate: true });
    };

    const onSubmit = (data: FormSchema) => {
        console.log("Form submission:", data);
        toast.success("Form submitted successfully!");
    };

    return (
        <div className="w-full">
            <h1 className="text-2xl font-semibold">
                {form.name}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-10">
                {form.fields.map((field: FormField) => (
                    <div key={field.id}>
                        <label className="block text-sm font-medium mb-2">
                            {field.label}
                            {field.required && <span className="text-destructive">*</span>}
                        </label>

                        {field.type === "text" && (
                            <div>
                                <Input
                                    type="text"
                                    {...register(field.name)}
                                    className={errors[field.name] ? "border-destext-destructive" : ""}
                                />
                                {errors[field.name] && (
                                    <p className="text-destructive text-sm mt-1">
                                        {errors[field.name]?.message as string}
                                    </p>
                                )}
                            </div>
                        )}

                        {field.type === "number" && (
                            <div>
                                <Input
                                    type="number"
                                    {...register(field.name, { valueAsNumber: true })}
                                    className={errors[field.name] ? "border-destext-destructive" : ""}
                                />
                                {errors[field.name] && (
                                    <p className="text-destructive text-sm mt-1">
                                        {errors[field.name]?.message as string}
                                    </p>
                                )}
                            </div>
                        )}

                        {field.type === "dropdown" && (
                            <div>
                                <Select
                                    onValueChange={(value) => handleSelectChange(field.name, value)}
                                >
                                    <SelectTrigger className={errors[field.name] ? "border-destext-destructive" : ""}>
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {field.options?.map((option) => (
                                            <SelectItem key={option} value={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors[field.name] && (
                                    <p className="text-destructive text-sm mt-1">
                                        {errors[field.name]?.message as string}
                                    </p>
                                )}
                            </div>
                        )}

                        {field.type === "radio" && (
                            <div className="space-y-2">
                                {field.options?.map((option) => (
                                    <label key={option} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value={option}
                                            {...register(field.name)}
                                        />
                                        {option}
                                    </label>
                                ))}
                                {errors[field.name] && (
                                    <p className="text-destructive text-sm mt-1">
                                        {errors[field.name]?.message as string}
                                    </p>
                                )}
                            </div>
                        )}

                        {field.type === "checkbox" && (
                            <div>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        {...register(field.name)}
                                    />
                                    {field.label}
                                </label>
                                {errors[field.name] && (
                                    <p className="text-destructive text-sm mt-1">
                                        {errors[field.name]?.message as string}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                <Button type="submit">
                    Submit form
                </Button>
            </form>
        </div>
    )
}

export default FormDetails
