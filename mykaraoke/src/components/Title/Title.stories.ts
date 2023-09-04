import type { Meta, StoryObj } from "@storybook/react";

import Title from "./Title";

const meta = {
  title: "Title",
  component: Title,
  tags: ["autodocs"],
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TitleItem: Story = {
  args: {
    children: "Argos"
  },
};
