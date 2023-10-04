import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

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
  columnDef("description", "Description"),
  columnDef("specialization", "Specialization"),
  columnDef("level", "Level"),
  columnDef("postingDate", "Posted"),
  columnDef("crawlDate", "Crawled"),
  columnDef("location", "Location"),
  columnDef("salary", "Salary"),
  columnDef("listingLink", "Listing Link"),
  columnDef("applyLink", "Apply Link"),
  columnDef("source", "Source"),
  {
    accessorKey: "keywords",
    header: "Keywords",
    cell: ({ row }) => {
      console.log(row);

      return <div className="text-right font-medium"></div>;
    },
  },
];
