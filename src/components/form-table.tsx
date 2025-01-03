"use client";

import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useForms } from '@/lib/form';
import Link from 'next/link';
import { useState } from 'react';

const FormTable = () => {

    const limit = 5;

    const [currentPage, setCurrentPage] = useState<number>(1);

    const { forms, total } = useForms().getForms(currentPage, limit);

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="bg-background rounded-lg border border-border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Form Name</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Fields</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {forms.map((form) => (
                        <TableRow key={form.id}>
                            <TableCell>{form.name}</TableCell>
                            <TableCell>
                                {new Date(form.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{form.fields.length} fields</TableCell>
                            <TableCell>
                                <Link href={`/forms/${form.id}`}>
                                    <Button variant="outline" size="sm">
                                        View form
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {totalPages > 1 && (
                <div className="flex items-center justify-between p-4 border-t border-border">
                    <div className="text-sm text-gray-500">
                        Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FormTable
