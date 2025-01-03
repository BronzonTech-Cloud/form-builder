import Navbar from "@/components/navbar";
import CreateForm from "@/components/create-form";

const CreateFormPage = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12">
            <h1 className="text-2xl md:text-3xl font-semibold">
                Create New Form
            </h1>

            <CreateForm />
        </div>
    );
};

export default CreateFormPage;
