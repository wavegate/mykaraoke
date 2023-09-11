// "use client";
import { useState } from "react";
import AnimatedPage from "@/components/AnimatedPage/AnimatedPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	faCubesStacked,
	faGraduationCap,
	faLocationDot,
	faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RolesPage() {
	return (
		<AnimatedPage positionAbsolute={false}>
			<div>Search for Roles</div>
			<div className="grid w-full items-center gap-1.5">
				<Label htmlFor="search">Search</Label>
				<div className="flex items-center space-x-2">
					<FontAwesomeIcon icon={faMagnifyingGlass} />
					<Input type="text" id="search" placeholder="Search for roles" />
					<Button type="button">Clear Filters</Button>
				</div>
				<div className="flex gap-2">
					<MyDropdownMenu
						title="Category"
						icon={<FontAwesomeIcon icon={faCubesStacked} />}
						options={["Software Engineering", "Product Design", "Product Management"]}
					/>
					<MyDropdownMenu
						title="Education"
						icon={<FontAwesomeIcon icon={faGraduationCap} />}
						options={[
							"Bootcamp",
							"Associate's",
							"Bachelor's",
							"Master's",
							"PhD",
							"MBA",
							"PharmD",
						]}
					/>
					<MyDropdownMenu
						title="Location"
						icon={<FontAwesomeIcon icon={faLocationDot} />}
						options={["Remote", "Remote in USA", "Hybrid"]}
					/>
				</div>
			</div>
		</AnimatedPage>
	);
}

// import { Button } from "@/components/ui/button";
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

function MyDropdownMenu({ title, icon, options }) {
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
