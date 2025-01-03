import FormTable from "@/components/form-table";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const FormsListPage = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl md:text-3xl font-semibold">
                    Your Forms
                </h1>
                <Link href="/forms/create">
                    <Button>
                        Create new form
                    </Button>
                </Link>
            </div>

            <FormTable />
        </div>
    );
};

export default FormsListPage
