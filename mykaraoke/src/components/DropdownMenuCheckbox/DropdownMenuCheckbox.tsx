import "./index.scss";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
// import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// type Checked = DropdownMenuCheckboxItemProps["checked"];

interface IDropdownMenuCheckbox {
	title: string;
	icon: ReactNode;
	options: string[];
}

export default function DropdownMenuCheckbox({
	title,
	icon,
	options,
}: IDropdownMenuCheckbox) {
	const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>(
		options.reduce((map, option) => {
			map[option] = false;
			return map;
		}, {})
	);

	const handleSelectedOption = (option) => () => {
		setSelectedOptions((prev) => {
			const newOptions = { ...prev, [option]: !prev[option] };
			return newOptions;
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="gap-2">
					{icon}
					{title}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>{title}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{options.map((option) => (
					<DropdownMenuCheckboxItem
						checked={selectedOptions[option]}
						onCheckedChange={handleSelectedOption(option)}
					>
						{option}
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
