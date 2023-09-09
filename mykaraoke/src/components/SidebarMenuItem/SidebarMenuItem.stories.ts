import type { Meta, StoryObj } from "@storybook/react";

import SidebarMenuItem from "./SidebarMenuItem";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const meta = {
  title: "SidebarMenuItem",
  component: SidebarMenuItem,
  tags: ["autodocs"],
} satisfies Meta<typeof SidebarMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: {
    link: "/",
    label: "Home",
    icon: faHouse,
  },
};
