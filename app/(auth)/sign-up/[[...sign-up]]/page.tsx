'use client';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh_-_65px)]">
      <SignUp />
    </div>
  );
}
