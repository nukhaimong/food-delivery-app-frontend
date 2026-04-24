import CreateProviderProfile from '@/components/modules/profile/createProviderProfile';
import ProfileCard from '@/components/modules/profile/profileCard';
import UpdateUserProfile from '@/components/modules/profile/updateUserProfile';
import { Roles } from '@/constant/roles';
import { providerService } from '@/services/provider.service';
import { userService } from '@/services/user.service';

export default async function Profile() {
  const { data } = await userService.getMe();

  const { data: providerData } = await providerService.getProviderById(
    data?.user?.id,
  );
  const provider = providerData?.provider;
  const providerInfo = {
    role: provider.user_role,
    name: provider.name,
    profileImage: provider.image,
    address: provider.providerProfile?.address,
    restaurantImage: provider.providerProfile?.restaurant_image,
    restaurantName: provider.providerProfile?.restaurant_name,
    phone: provider.providerProfile?.phone_number,
  };

  return (
    <div className="max-w-7xl mx-auto">
      {data.user.user_role === Roles.user ||
      data.user.user_role === Roles.admin ? (
        <>
          <ProfileCard
            role={data.user.user_role}
            name={data.user.name}
            profileImage={data.user.image}
          />
          <UpdateUserProfile />
        </>
      ) : (
        <>
          <div className="flex flex-row gap-10 items-start">
            <ProfileCard
              role={providerInfo.role}
              name={providerInfo.name}
              profileImage={providerInfo.profileImage}
              address={providerInfo.address}
              restaurantImage={providerInfo.restaurantImage}
              restaurantName={providerInfo.restaurantName}
              phone={providerInfo.phone}
            />
            <UpdateUserProfile />
          </div>
          <CreateProviderProfile />
        </>
      )}
    </div>
  );
}
