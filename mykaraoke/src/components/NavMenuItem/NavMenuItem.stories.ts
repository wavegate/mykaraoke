import type { Meta, StoryObj } from "@storybook/react";

import NavMenuItem from "./NavMenuItem";
import { faHouse, faMoon } from "@fortawesome/free-solid-svg-icons";

const meta = {
  title: "NavMenuItem",
  component: NavMenuItem,
  tags: ["autodocs"],
} satisfies Meta<typeof NavMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavMenuItemItem: Story = {
  args: {
    icon: faHouse,
  },
};

export const MoonNavMenuItem: Story = {
  args: {
    icon: faMoon,
  },
};
