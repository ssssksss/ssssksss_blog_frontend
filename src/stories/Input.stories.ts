import type { Meta, StoryObj } from '@storybook/react';

import Input from './../components/common/input/Input';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Input> = {
  title: 'Ssssksss/Input',
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Input>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Text: Story = {
  args: {
    type: 'text',
    placeholder: 'placeholder',
  },
};
