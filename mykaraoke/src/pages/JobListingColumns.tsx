import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Badge } from "lucide-react";

export type Keyword = {
  name: string;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  description: string;
  specialization: string;
  level: string;
  postingDate: string;
  crawlDate: string;
  location: string;
  salary: string;
  listingLink: string;
  applyLink: string;
  source: string;
  sourceId: string;
  keywords: Keyword[];
};

const columnDef = (key: string, label: string) => {
  return {
    accessorKey: key,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {label}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  };
};

export const jobListingColumns: ColumnDef<Job>[] = [
  columnDef("title", "Title"),
  columnDef("company", "Company"),
  // columnDef("specialization", "Specialization"),
  // columnDef("level", "Level"),
  columnDef("postingDate", "Posted"),
  columnDef("crawlDate", "Crawled"),
  columnDef("location", "Location"),
  columnDef("salary", "Salary"),
  columnDef("listingLink", "Listing Link"),
  {
    accessorKey: "applyLink",
    header: "Apply Link",
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.original.applyLink?.slice(0, 20)}
        </div>
      );
    },
  },
  columnDef("source", "Source"),
  {
    accessorKey: "keywords",
    header: "Keywords",
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.original.keywords.map((keyword) => {
            return <div key={keyword.name}>{keyword.name}</div>;
          })}
        </div>
      );
    },
  },
];
