import { colorTypes, themeTypes } from '@styles/theme';

export interface IMemoCategory {
  id: string;
  backgroundColor: Partial<colorTypes | themeTypes> | number;
  name: string;
}
