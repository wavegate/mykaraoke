import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import RecordAnswer from "@/components/RecordAnswer/RecordAnswer";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
export const columns = [
    {
        accessorKey: "question",
        header: ({ column }) => {
            return (_jsxs(Button, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === "asc"), children: ["Question", _jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })] }));
        },
    },
    {
        accessorKey: "answer",
        header: "Answer",
    },
    {
        accessorKey: "audio_url",
        header: "Audio URL",
        cell: ({ row }) => {
            const question = row.original;
            return (_jsx("a", { href: question.audio_url, target: "_blank", children: "Listen to audio" }));
        },
    },
    {
        id: "record",
        header: "Record answer",
        cell: ({ row }) => {
            const question = row.original;
            return (_jsx("div", { children: _jsx(RecordAnswer, { id: question.id }) }));
        },
    },
    {
        accessorKey: "user_answer",
        header: "User Answer",
        cell: ({ row }) => {
            const question = row.original;
            return question.user_answer ? (_jsx("a", { href: question.user_answer, target: "_blank", children: "Listen to answer" })) : (_jsx("div", {}));
        },
    },
    {
        accessorKey: "user_answer_transcription",
        header: "User Answer Transcription",
    },
    {
        accessorKey: "analysis",
        header: "Analysis",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const job = row.original;
            return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "h-8 w-8 p-0", children: [_jsx("span", { className: "sr-only", children: "Open menu" }), _jsx(MoreHorizontal, { className: "h-4 w-4" })] }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuLabel, { children: "Actions" }), _jsx(DropdownMenuItem, { onClick: () => navigator.clipboard.writeText(job.id), children: "Copy payment ID" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { children: "View customer" }), _jsx(DropdownMenuItem, { children: "View payment details" })] })] }));
        },
    },
];
