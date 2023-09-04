import type { Meta, StoryObj } from "@storybook/react";

import Table from "./Table";

const meta = {
  title: "Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TableItem: Story = {
  args: {
    items: [
      { id: 1, username: "frank", password: "sam" },
      { id: 2, username: "sam", password: "frank" },
    ],
  },
};
