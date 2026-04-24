'use client';

import { Loader2, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ModeToggle } from './modeToggle';
import Link from 'next/link';
import CartButton from '../modules/cart/cart';
import { useCartStore } from '@/store/useCartStore';
import { authClient } from '@/lib/auth-client';
import { useState, useEffect } from 'react';
import { getMe } from '@/actions/user.action';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    logout: {
      title: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: '/',
    title: 'HANG',
  },
  menu = [
    { title: 'Home', url: '/' },
    { title: 'Restaurants', url: '/restaurants' },
    { title: 'Cuisines', url: '/cuisines' },
    { title: 'Explore Foods', url: '/foods' },
    { title: 'Dashboard', url: '/user-dashboard' },
  ],
  auth = {
    login: { title: 'Login', url: '/log-in' },
    logout: { title: 'Logout' },
    signup: { title: 'Sign up', url: '/sign-up' },
  },
  className,
}: Navbar1Props) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await getMe();
        if (data && !error) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      useCartStore.persist.clearStorage();
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setUser(null); // Clear user state
            window.location.href = '/';
          },
        },
      });
    } catch (error) {
      console.error('Logout failed', error);
      setIsLoggingOut(false);
    }
  };

  // Get user initial for avatar fallback
  const getUserInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <section className={cn('py-4', className)}>
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href={logo.url}>
              <p className="cursor-pointer text-3xl font-black tracking-tighter text-zinc-900 dark:text-white">
                H<span className="text-orange-500">AANG</span>
                <span className="inline-block h-2 w-2 rounded-full bg-orange-500 ml-0.5" />
              </p>
            </Link>

            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <CartButton />

            {!isLoading && user ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                >
                  {isLoggingOut ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {auth.logout.title}
                </Button>
                <Link href="/profile">
                  <Avatar className="h-9 w-9 border border-gray-200 dark:border-slate-800 cursor-pointer hover:opacity-80 transition-opacity">
                    <AvatarImage
                      src={user?.image || ''}
                      alt={user?.name || 'User'}
                    />
                    <AvatarFallback className="bg-orange-500 text-white font-bold">
                      {getUserInitial()}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </>
            ) : !isLoading && !user ? (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            ) : (
              // Loading state
              <Button variant="outline" size="sm" disabled>
                <Loader2 className="h-4 w-4 animate-spin" />
              </Button>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={logo.url}>
              <p className="cursor-pointer text-3xl font-black tracking-tighter text-zinc-900 dark:text-white">
                H<span className="text-orange-500">AANG</span>
                <span className="inline-block h-2 w-2 rounded-full bg-orange-500 ml-0.5" />
              </p>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url}>
                      <p className="cursor-pointer">{logo.title}</p>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <div className="flex w-full flex-col gap-4">
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </div>

                  <div className="flex flex-col gap-3">
                    <ModeToggle />
                    <CartButton />

                    {!isLoading && user ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={isLoggingOut}
                          onClick={handleLogout}
                        >
                          {isLoggingOut && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          {auth.logout.title}
                        </Button>
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <Avatar className="h-8 w-8 border border-gray-200 dark:border-slate-800">
                            <AvatarImage
                              src={user?.image || ''}
                              alt={user?.name || 'User'}
                            />
                            <AvatarFallback className="bg-orange-500 text-white text-xs font-bold">
                              {getUserInitial()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">
                            {user?.name || 'Profile'}
                          </span>
                        </Link>
                      </>
                    ) : !isLoading && !user ? (
                      <>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button asChild>
                          <Link href={auth.signup.url}>
                            {auth.signup.title}
                          </Link>
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" disabled>
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <Link
          href={item.url}
          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
        >
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <Link
      key={item.title}
      href={item.url}
      className="text-md font-semibold block py-2 px-4 hover:bg-muted rounded-md transition-colors"
    >
      {item.title}
    </Link>
  );
};

export { Navbar };
