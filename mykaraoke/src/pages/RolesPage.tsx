import AnimatedPage from "@/components/AnimatedPage/AnimatedPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RolesPage() {
	return (
		<AnimatedPage>
			<div>Search for Roles</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="search">Search</Label>
				<Input type="text" id="search" placeholder="Search for roles" />
				<FontAwesomeIcon icon={faMagnifyingGlass} />
				<Button type="button">Clear Filters</Button>
			</div>
		</AnimatedPage>
	);
}
