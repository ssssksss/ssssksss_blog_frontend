import Input from '@components/common/input/Input';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
  title: 'Inputs',
  component: Input, // 스토리북에서 지정할 컴포넌트
  tags: ['docs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Text: Story = {
  args: {
    type: 'text',
    errorMessage: '텍스트를 입력하세요',
    bg: '',
    pd: '',
    center: false,
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    errorMessage: '비밀번호를 입력하세요',
  },
};

export const Radio: Story = {
  args: {
    type: 'radio',
  },
};

export const Checkbox: Story = {
  args: {
    type: 'checkbox',
    h: 'md',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    errorMessage: '이메일을 입력하세요',
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    leftIconImage:
      'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-search-strong-256.png',
  },
};

export const Range: Story = {
  args: {
    type: 'range',
  },
};

export const File: Story = {
  args: {
    type: 'file',
    w: '20rem',
    h: '20rem',
    bg: '',
    color: '',
    state: '',
  },
};
