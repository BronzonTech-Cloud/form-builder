import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Form } from "@/lib/types";

interface FormsState {
    forms: Form[]; // array of forms
    addForm: (form: Omit<Form, "id" | "createdAt">) => void; // omits id and createdAt(excepct id and createdAt, all other fields are required)
    getForms: (page: number, limit: number) => { forms: Form[]; total: number }; // returns forms and total number of forms
    getForm: (id: string) => Form | undefined; // returns form by id
}

export const useForms = create<FormsState>()(
    persist(
        // set - update the state, get - access the state
        (set, get) => ({
            forms: [],
            addForm: (formData) => {
                const form: Form = {
                    ...formData,
                    id: crypto.randomUUID(),
                    createdAt: new Date(),
                };
                set((state) => ({ forms: [...state.forms, form] }));
            },
            getForms: (page, limit) => {
                const forms = get().forms;
                const start = (page - 1) * limit; // starting index 
                const end = start + limit; // ending index
                return {
                    forms: forms.slice(start, end),
                    total: forms.length,
                };
            },
            getForm: (id) => get().forms.find((form) => form.id === id),
        }),
        {
            name: "forms-storage",
        }
    )
);