import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

export type UserRole = 'USER' | 'PROVIDER';

interface BaseProfileProps {
  role: UserRole;
  name: string;
  profileImage?: string;
}

interface UserProfileProps extends BaseProfileProps {
  role: 'USER';
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
  return (
    <div className="w-full max-w-2xl rounded-xl border p-6 shadow-sm my-10">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <div className="relative overflow-hidden h-28 w-28 rounded-full border">
          {props.profileImage ? (
            <Image
              src={props.profileImage}
              alt={props.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <Avatar className="object-cover h-full w-full">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold">{props.name}</h2>
          <p className="text-sm text-muted-foreground">
            {props.role === 'PROVIDER' ? 'Restaurant Owner' : 'Customer'}
          </p>
        </div>
      </div>

      {/* Provider Details */}
      {props.role === 'PROVIDER' && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative h-28 w-28 overflow-hidden border">
              {props.restaurantImage && props.restaurantName ? (
                <Image
                  src={props.restaurantImage}
                  alt={props.restaurantName}
                  fill
                  className="object-cover"
                />
              ) : (
                <Avatar className="object-cover h-full w-full">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold">
                {props.restaurantName
                  ? props.restaurantName
                  : 'Your Restaurant Name'}
              </p>
              <p className="text-xs text-muted-foreground">Restaurant</p>
            </div>
          </div>

          <div className="text-sm">
            <p>
              <span className="font-medium">Address:</span>{' '}
              {props.address ? props.address : 'your restaurant address'}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{' '}
              {props.phone ? props.phone : 'your phone number'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
