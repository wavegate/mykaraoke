import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
export const columns = [
    {
        accessorKey: "company",
        header: ({ column }) => {
            return (_jsxs(Button, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === "asc"), children: ["Company", _jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })] }));
        },
    },
    {
        accessorKey: "position_name",
        header: "Position",
    },
    {
        accessorKey: "salary",
        header: ({ column }) => {
            return (_jsxs(Button, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === "asc"), children: ["Salary", _jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })] }));
        },
    },
    {
        accessorKey: "posting_date_parsed",
        header: "Posting Date",
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            const job = row.original;
            return (_jsxs(Collapsible, { children: [_jsx(CollapsibleTrigger, { children: "Click to view" }), _jsx(CollapsibleContent, { children: _jsx("div", { className: `whitespace-pre-line`, children: job.description }) })] }));
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const job = row.original;
            return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "h-8 w-8 p-0", children: [_jsx("span", { className: "sr-only", children: "Open menu" }), _jsx(MoreHorizontal, { className: "h-4 w-4" })] }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuItem, { children: _jsx("a", { href: job.url, target: "_blank", children: "Visit Listing" }) }), _jsxs(DropdownMenuItem, { children: [" ", _jsx("a", { href: job.external_apply_link, target: "_blank", children: "External Apply Link" })] })] })] }));
        },
    },
];
