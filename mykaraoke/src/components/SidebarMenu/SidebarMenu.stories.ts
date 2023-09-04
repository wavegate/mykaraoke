import type { Meta, StoryObj } from "@storybook/react";

import SidebarMenu from "./SidebarMenu";

const meta = {
  title: "SidebarMenu",
  component: SidebarMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof SidebarMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Expanded: Story = {
  args: {
    expanded: true,
  },
};
