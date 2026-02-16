import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

// 1. Added ADMIN to the role type
export type UserRole = 'USER' | 'PROVIDER' | 'ADMIN';

interface BaseProfileProps {
  role: UserRole;
  name: string;
  profileImage?: string;
}

interface UserProfileProps extends BaseProfileProps {
  role: 'USER' | 'ADMIN';
}

interface ProviderProfileProps extends BaseProfileProps {
  role: 'PROVIDER';
  restaurantName?: string;
  restaurantImage?: string;
  address?: string;
  phone?: string;
}

type ProfileProps = UserProfileProps | ProviderProfileProps;

export default function ProfileCard(props: ProfileProps) {
  const getRoleLabel = () => {
    switch (props.role) {
      case 'ADMIN':
        return 'Administrator';
      case 'PROVIDER':
        return 'Restaurant Owner';
      default:
        return 'Customer';
    }
  };

  return (
    <div className="w-full max-w-2xl rounded-xl border p-6 shadow-sm my-10 bg-white dark:bg-zinc-950">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <div className="relative overflow-hidden h-28 w-28 rounded-full border border-zinc-200 dark:border-zinc-800">
          {props.profileImage ? (
            <Image
              src={props.profileImage}
              alt={props.name}
              fill
              className="object-cover"
              sizes="96px"
              priority
            />
          ) : (
            <Avatar className="h-full w-full">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-orange-100 text-orange-600 font-bold">
                {props.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white uppercase tracking-tight italic">
            {props.name}
          </h2>
          <p className="text-sm font-black uppercase tracking-widest text-orange-500">
            {getRoleLabel()}
          </p>
        </div>
      </div>

      {/* Provider Details - Only shows if role is PROVIDER */}
      {props.role === 'PROVIDER' && (
        <div className="mt-8 space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-start gap-4">
            <div className="relative h-32 w-32 overflow-hidden border rounded-2xl">
              {props.restaurantImage && props.restaurantName ? (
                <Image
                  src={props.restaurantImage}
                  alt={props.restaurantName}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              ) : (
                <div className="h-full w-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                  <Avatar className="h-full w-full">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>REST</AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
            <div>
              <p className="text-xl font-black uppercase text-zinc-900 dark:text-white">
                {props.restaurantName || 'Your Restaurant Name'}
              </p>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                Registered Restaurant
              </p>
            </div>
          </div>

          <div className="text-md bg-zinc-50 dark:bg-zinc-900 p-4 rounded-2xl space-y-2">
            <p className="flex justify-between">
              <span className="font-bold text-zinc-500 uppercase text-sm">
                Address
              </span>
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {props.address || 'Not Set'}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="font-bold text-zinc-500 uppercase text-sm">
                Phone
              </span>
              <span className="font-medium text-orange-600 font-mono">
                {props.phone || 'Not Set'}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
