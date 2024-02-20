import type { Meta, StoryObj } from '@storybook/react';
import Button from '../components/common/button/Button';

const meta: Meta<typeof Button> = {
  title: 'Ssssksss/Button',
  component: Button, // 스토리북에서 지정할 컴포넌트
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    Button: {},
  },
};
