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
						options={["Software Engineering", "Product Design", "Product Management"]}
					/>
					<DropdownMenuCheckbox
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
					<DropdownMenuCheckbox
						title="Location"
						icon={<FontAwesomeIcon icon={faLocationDot} />}
						options={["Remote", "Remote in USA", "Hybrid"]}
					/>
				</div>
			</div>
		</AnimatedPage>
	);
}
