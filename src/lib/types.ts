export interface User {
    email: string;
    password: string;
}

export interface Form {
    id: string;
    name: string;
    createdAt: Date;
    userId: string;
    fields: FormField[];
}

export interface FormField {
    id: string;
    type: "text" | "number" | "dropdown" | "radio" | "checkbox";
    label: string;
    name: string;
    required?: boolean;
    options?: string[];
    validation?: {
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    };
}

export interface FormValues {
    [key: string]: string | number | boolean;
}