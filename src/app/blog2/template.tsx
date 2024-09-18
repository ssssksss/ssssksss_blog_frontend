import { ReactNode } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  return (
      <main className='p-4 bg-red-100 w-full h-full'>{children}</main>
  );
}
