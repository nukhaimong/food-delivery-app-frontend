import ProfileCard from '@/components/modules/profile/profileCard';
import UpdateUserProfile from '@/components/modules/profile/updateUserProfile';
import { Roles } from '@/constant/roles';
import { userService } from '@/services/user.service';

export default async function Profile() {
  const { data } = await userService.getSession();
  const { data: provider } = await userService.getProvider(data.user.id);
  const providerInfo = {
    role: provider.provider.user_role,
    name: provider.provider.name,
    profileImage: provider.provider.image,
    address: provider.provider.providerProfile?.address,
    restaurantImage: provider.provider.providerProfile?.restaurant_image,
    restaurantName: provider.provider.providerProfile?.restaurant_name,
    phone: provider.provider.providerProfile?.phone_number,
  };

  return (
    <div className="max-w-7xl mx-auto">
      {data.user.user_role === Roles.user ? (
        <>
          <ProfileCard
            role={data.user.user_role}
            name={data.user.name}
            profileImage={data.user.image}
          />
          <UpdateUserProfile />
        </>
      ) : (
        <ProfileCard
          role={providerInfo.role}
          name={providerInfo.name}
          profileImage={providerInfo.profileImage}
          address={providerInfo.address}
          restaurantImage={providerInfo.restaurantImage}
          restaurantName={providerInfo.restaurantName}
          phone={providerInfo.phone}
        />
      )}
    </div>
  );
}
