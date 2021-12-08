import { useMutation, UseMutationOptions } from 'react-query';
import database from '@react-native-firebase/database';
import { useAuth } from '@/hooks/useAuth';

type CreatePackageRequest = {
  name: string;
  code: string;
  departureDate: string;
  status: string;
};

async function createPackageRequest(
  user_id: string,
  payload: CreatePackageRequest,
) {
  const userPackagesRef = database().ref(`/users/${user_id}/packages`);

  const newPackage: CreatePackageRequest = {
    code: payload.code,
    name: payload.code,
    departureDate: payload.departureDate,
    status: payload.status,
  };

  await userPackagesRef.push({
    owner_id: user_id,
    ...newPackage,
  });
}

function useCreatePackage() {
  const { user } = useAuth();

  return useMutation<any, any, CreatePackageRequest>(
    [createPackageRequest.name, user.id],
    (payload) => createPackageRequest(user.id, payload),
  );
}

export { useCreatePackage, CreatePackageRequest };
