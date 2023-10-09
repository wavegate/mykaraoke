// "use client";
import DropdownMenuCheckbox from "@/components/DropdownMenuCheckbox/DropdownMenuCheckbox";
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
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { mockJobRoles, options } from "./constants.ts";
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
					<DropdownMenuCheckbox
						title="Category"
						icon={<FontAwesomeIcon icon={faCubesStacked} />}
						options={options.category}
					/>
					<DropdownMenuCheckbox
						title="Education"
						icon={<FontAwesomeIcon icon={faGraduationCap} />}
						options={options.education}
					/>
					<DropdownMenuCheckbox
						title="Location"
						icon={<FontAwesomeIcon icon={faLocationDot} />}
						options={options.location}
					/>
				</div>
				<div className="flex justify-center">
					<div className="grid grid-cols-3 gap-4 justify-center, max-w-[73rem]">
						{mockJobRoles.map((role) => (
							<Card className="max-w-[380px]">
								<CardHeader>
									<CardTitle>{role.title}</CardTitle>
									<CardDescription>{role.summary}</CardDescription>
								</CardHeader>
								{/* <CardContent>
						</CardContent> */}
								<CardFooter>
									<p>{role.appearanceCount} found</p>
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			</div>
		</AnimatedPage>
	);
}
