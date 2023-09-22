import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export type Job = {
  id: string;
  position_name: string;
  salary: string;
  company: string;
  location: string;
  url: string;
  posting_date_parsed: string;
  description: string;
  external_apply_link: string;
};

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "company",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "position_name",
    header: "Position",
  },
  {
    accessorKey: "salary",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Salary
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
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

      return (
        <Collapsible>
          <CollapsibleTrigger>Click to view</CollapsibleTrigger>
          <CollapsibleContent>
            <div className={`whitespace-pre-line`}>{job.description}</div>
          </CollapsibleContent>
        </Collapsible>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const job = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <a href={job.url} target="_blank">
                Visit Listing
              </a>
            </DropdownMenuItem>

            <DropdownMenuItem>
              {" "}
              <a href={job.external_apply_link} target="_blank">
                External Apply Link
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
