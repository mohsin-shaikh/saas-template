import { notFound, redirect } from 'next/navigation';
import { Menu } from 'lucide-react';

import { siteConfig } from '@/config/site';
import { Icons } from '@/components/icons';
import { MainNav } from '@/components/main-nav';
import { MobileMenu } from '@/components/mobile-nav';
import { ModeToggle } from '@/components/mode-toggle';
import { UserNav } from '@/components/user-nav';
import { currentUser } from '@/lib/auth';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const user = await currentUser();

  return (
    <>
      <div className='sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='flex h-16 items-center justify-between px-4'>
          <div className='block lg:hidden'>
            <MobileMenu
              // @ts-expect-error
              userRole={user.role}
            />
          </div>
          <div className='flex'>
            <Icons.logo className='h-6 w-6' />
            <span className='hidden font-bold sm:inline-block'>
              {siteConfig.name}
            </span>
          </div>
          <MainNav
            className='mx-6 hidden lg:flex'
            // @ts-expect-error
            userRole={user.role}
          />
          <div className='flex items-center space-x-4 lg:ml-auto'>
            <ModeToggle />
            <UserNav
              user={{
                name: user?.name ?? 'N/A',
                email: user?.email ?? 'N/A',
              }}
            />
          </div>
        </div>
      </div>
      <main className={`flex min-h-full w-full`}>
        <div className='w-full bg-background p-4'>{children}</div>
      </main>
    </>
  );
};

export default DashboardLayout;
