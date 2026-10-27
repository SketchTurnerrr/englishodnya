'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import type * as React from 'react';
import { ConvexReactClient } from 'convex/react';
import { env } from '@/env';
import { useAuth } from '@clerk/react';

const convexENV = env.NEXT_PUBLIC_CONVEX_URL;

if (!convexENV) {
  throw new Error('Missing NEXT_PUBLIC_CONVEX_URL environment variable.');
}

const convex = new ConvexReactClient(convexENV);

export function Providers({
  children,
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </NextThemesProvider>
  );
}
