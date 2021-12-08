import database from '@react-native-firebase/database';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Package, packagesSlice } from '@/store/package.slice';

type UseGetUserPackagesReturn = {
  packages: Package[];
};

type FirebasePackAgeList = Record<string, Package>;

function useGetCurrentUserPackages(): UseGetUserPackagesReturn {
  const { user } = useAuth();
  const [packages, setPackages] = useRecoilState(packagesSlice);

  const userPackagesRef = database().ref(`/users/${user.id}/packages`);

  useEffect(() => {
    userPackagesRef.on('value', (data) => {
      const firebasePackages = data.val() as FirebasePackAgeList;

      const parsedPackages = Object.entries(firebasePackages).map(
        ([key, value]) => ({
          id: key,
          ...value,
        }),
      );

      setPackages(parsedPackages);
    });

    return () => userPackagesRef.off('value');
  }, []);

  return {
    packages,
  };
}

export { useGetCurrentUserPackages };
