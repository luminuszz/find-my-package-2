import { atom } from 'recoil';

export enum Status {
  padding = 'padding',
  error = 'error',
  success = 'success',
}

export type Package = {
  code: string;
  id: string;
  name: string;
  departureData: string;
  eventDate: string;
  eventHour: string;
  status: string;
};

export const packagesSlice = atom<Package[]>({
  key: 'packageSlice',
  default: [],
});

export const packageStatusSlice = atom<Status>({
  key: 'packageStatus',
  default: Status.success,
});
