import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@monorepo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@monorepo/ui/components/card";

const meta: Meta<typeof Card> = {
  component: Card,
  title: "UI/Card",
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content area for your information or form elements.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="outline">
          Cancel
        </Button>
        <Button className="ml-2" size="sm">
          Confirm
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>A minimal card with just a title and content.</p>
      </CardContent>
    </Card>
  ),
};
