import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "@monorepo/ui/components/badge";

const meta: Meta<typeof Badge> = {
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
  component: Badge,
  title: "UI/Badge",
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};
