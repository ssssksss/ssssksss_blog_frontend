import Button from '@components/common/button/Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Buttons',
  component: Button, // 스토리북에서 지정할 컴포넌트
  tags: ['docs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Active: Story = {
  args: {
    active: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Danger: Story = {
  args: {
    state: 'danger',
  },
};

export const Warning: Story = {
  args: {
    state: 'warning',
  },
};

export const Red100: Story = {
  args: {
    bg: 'red100',
    color: 'white80',
  },
};

export const Red80: Story = {
  args: {
    bg: 'red80',
    color: 'white80',
  },
};

export const Red60: Story = {
  args: {
    bg: 'red60',
    color: 'white80',
  },
};

export const Red40: Story = {
  args: {
    bg: 'red40',
    color: 'white80',
  },
};

export const Red20: Story = {
  args: {
    bg: 'red20',
    color: 'white80',
  },
};

export const Orange100: Story = {
  args: {
    bg: 'orange100',
    color: 'white80',
  },
};

export const Orange80: Story = {
  args: {
    bg: 'orange80',
    color: 'white80',
  },
};

export const Orange60: Story = {
  args: {
    bg: 'orange60',
    color: 'white80',
  },
};

export const Orange40: Story = {
  args: {
    bg: 'orange40',
    color: 'white80',
  },
};

export const Orange20: Story = {
  args: {
    bg: 'orange20',
    color: 'white80',
  },
};

export const Yellow100: Story = {
  args: {
    bg: 'yellow100',
    color: 'white80',
  },
};

export const Yellow80: Story = {
  args: {
    bg: 'yellow80',
    color: 'white80',
  },
};

export const Yellow60: Story = {
  args: {
    bg: 'yellow60',
    color: 'white80',
  },
};

export const Yellow40: Story = {
  args: {
    bg: 'yellow40',
    color: 'white80',
  },
};

export const Yellow20: Story = {
  args: {
    bg: 'yellow20',
    color: 'white80',
  },
};

export const Green100: Story = {
  args: {
    bg: 'green100',
    color: 'white80',
  },
};

export const Green80: Story = {
  args: {
    bg: 'green80',
    color: 'white80',
  },
};

export const Green60: Story = {
  args: {
    bg: 'green60',
    color: 'white80',
  },
};

export const Green40: Story = {
  args: {
    bg: 'green40',
    color: 'white80',
  },
};

export const Green20: Story = {
  args: {
    bg: 'green20',
    color: 'white80',
  },
};

export const Skyblue100: Story = {
  args: {
    bg: 'skyblue100',
    color: 'white80',
  },
};

export const Skyblue80: Story = {
  args: {
    bg: 'skyblue80',
    color: 'white80',
  },
};

export const Skyblue60: Story = {
  args: {
    bg: 'skyblue60',
    color: 'white80',
  },
};

export const Skyblue40: Story = {
  args: {
    bg: 'skyblue40',
    color: 'white80',
  },
};

export const Skyblue20: Story = {
  args: {
    bg: 'skyblue20',
    color: 'white80',
  },
};

export const Blue100: Story = {
  args: {
    bg: 'blue100',
    color: 'white80',
  },
};

export const Blue80: Story = {
  args: {
    bg: 'blue80',
    color: 'white80',
  },
};

export const Blue60: Story = {
  args: {
    bg: 'blue60',
    color: 'white80',
  },
};

export const Blue40: Story = {
  args: {
    bg: 'blue40',
    color: 'white80',
  },
};

export const Blue20: Story = {
  args: {
    bg: 'blue20',
    color: 'white80',
  },
};

export const Purple100: Story = {
  args: {
    bg: 'purple100',
    color: 'white80',
  },
};

export const Purple80: Story = {
  args: {
    bg: 'purple80',
    color: 'white80',
  },
};

export const Purple60: Story = {
  args: {
    bg: 'purple60',
    color: 'white80',
  },
};

export const Purple40: Story = {
  args: {
    bg: 'purple40',
    color: 'white80',
  },
};

export const Purple20: Story = {
  args: {
    bg: 'purple20',
    color: 'white80',
  },
};

export const Pink100: Story = {
  args: {
    bg: 'pink100',
    color: 'white80',
  },
};

export const Pink80: Story = {
  args: {
    bg: 'pink80',
    color: 'white80',
  },
};

export const Pink60: Story = {
  args: {
    bg: 'pink60',
    color: 'white80',
  },
};

export const Pink40: Story = {
  args: {
    bg: 'pink40',
    color: 'white80',
  },
};

export const Pink20: Story = {
  args: {
    bg: 'pink20',
    color: 'white80',
  },
};

export const Black100: Story = {
  args: {
    bg: 'black100',
    color: 'white80',
  },
};

export const Black80: Story = {
  args: {
    bg: 'black80',
    color: 'white80',
  },
};

export const Black60: Story = {
  args: {
    bg: 'black60',
    color: 'white80',
  },
};

export const Black40: Story = {
  args: {
    bg: 'black40',
    color: 'white80',
  },
};

export const Black20: Story = {
  args: {
    bg: 'black20',
    color: 'white80',
  },
};

export const Gray100: Story = {
  args: {
    bg: 'gray100',
    color: 'white80',
  },
};

export const Gray80: Story = {
  args: {
    bg: 'gray80',
    color: 'white80',
  },
};

export const Gray60: Story = {
  args: {
    bg: 'gray60',
    color: 'white80',
  },
};

export const Gray40: Story = {
  args: {
    bg: 'gray40',
    color: 'white80',
  },
};

export const Gray20: Story = {
  args: {
    bg: 'gray20',
    color: 'white80',
  },
};

export const White100: Story = {
  args: {
    bg: 'white100',
    color: 'black80',
  },
};

export const White80: Story = {
  args: {
    bg: 'white80',
    color: 'black80',
  },
};

export const White60: Story = {
  args: {
    bg: 'white60',
    color: 'black80',
  },
};

export const White40: Story = {
  args: {
    bg: 'white40',
    color: 'black80',
  },
};

export const White20: Story = {
  args: {
    bg: 'white20',
    color: 'black80',
  },
};

export const Transparent: Story = {
  args: {
    bg: 'transparent',
  },
};

export const Outline: Story = {
  args: {
    outline: true,
  },
};
