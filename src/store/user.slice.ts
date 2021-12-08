import { atom } from 'recoil';

export type User = {
  name: string;
  email: string;
  id: string;
};
export const userSlice = atom<User | null>({
  key: 'userSlice',
  default: null,
});
