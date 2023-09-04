import type { Meta, StoryObj } from "@storybook/react";

import Dropdown from "./Dropdown";

const meta = {
  title: "Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownItem: Story = {
  args: {
    trigger: (
      <div className={`resize border border-solid border-black overflow-auto`}>
        Hi
      </div>
    ),
    gap: 12,
    content: "Top content",
  },
};
