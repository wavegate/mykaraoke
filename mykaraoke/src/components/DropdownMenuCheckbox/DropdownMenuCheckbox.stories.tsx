import type { Meta, StoryObj } from "@storybook/react";

import DropdownMenuCheckbox from "./DropdownMenuCheckbox";
import { faCubesStacked } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const meta = {
	title: "DropdownMenuCheckbox",
	component: DropdownMenuCheckbox,
	tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenuCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownMenuCheckboxItem: Story = {
	args: {
		title: "Title",
		icon: <FontAwesomeIcon icon={faCubesStacked} />,
		options: ["Option 1", "Option 2", "Option 3"],
	},
};
