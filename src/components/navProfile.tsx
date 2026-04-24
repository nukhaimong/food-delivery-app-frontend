import { userService } from '@/services/user.service';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default async function NavProfile() {
  const { data } = await userService.getMe();
  const user = data?.user;

  return (
    <Avatar className="h-9 w-9 border border-gray-200 dark:border-slate-800">
      <AvatarImage src={user?.image || ''} alt={user?.name} />
      <AvatarFallback className="bg-orange-500 text-white font-bold">
        {user?.name?.charAt(0).toUpperCase() || 'U'}
      </AvatarFallback>
    </Avatar>
  );
}
