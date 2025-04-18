import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { SignedIn, UserButton } from '@clerk/nextjs';

export async function Header() {
  const { userId } = await auth();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container mx-auto flex h-16 items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold">
            English Щодня
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Features
          </a>
          <a
            href="#philosophy"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Philosophy
          </a>
          <a
            href="#activities"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Activities
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Testimonials
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <Link
            href={!userId ? '/sign-in' : '/daily-practice'}
            className="text-white h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive bg-emerald-600 hover:bg-emerald-700"
          >
            {!userId ? 'Розпочати' : 'Вчити'}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
