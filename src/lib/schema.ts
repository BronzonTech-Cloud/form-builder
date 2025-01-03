import { z } from "zod";

export const FormFieldSchema = z.object({
    id: z.string(),
    type: z.enum(["text", "number", "dropdown", "radio", "checkbox"]),
    label: z.string().min(1, "Label is required"),
    name: z.string().min(1, "Name is required"),
    required: z.boolean().optional(),
    options: z.array(z.string()).optional(),
    validation: z.object({
        required: z.boolean().optional(),
        minLength: z.number().optional(),
        maxLength: z.number().optional(),
        min: z.number().optional(),
        max: z.number().optional(),
    }).optional(),
});

export const CreateFormSchema = z.object({
    name: z.string().min(1, "Form name is required"),
    fields: z.array(FormFieldSchema).min(1, "At least one field is required"),
});

export type FormFieldValues = z.infer<typeof FormFieldSchema>
export type CreateFormValues = z.infer<typeof CreateFormSchema>
