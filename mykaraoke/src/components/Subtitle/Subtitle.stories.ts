import type { Meta, StoryObj } from "@storybook/react";

import Subtitle from "./Subtitle";

const meta = {
  title: "Subtitle",
  component: Subtitle,
  tags: ["autodocs"],
} satisfies Meta<typeof Subtitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SubtitleItem: Story = {
  args: {
    children: "Job Application Manager"
  },
};
