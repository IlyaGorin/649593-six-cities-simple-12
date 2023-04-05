export enum AppRoute {
  Root = '/',
  Login = '/login',
  Room = '/offer/',
  RoomId = ':id',
}

export const CHAR_LENGTH = 50;

export enum LocationName {
  PARIS = 'Paris',
  COLOGNE ='Cologne',
  BRUSSELS = 'Brussels',
  AMSTERDAM = 'Amsterdam',
  HAMBURG = 'Hamburg',
  DUSSELDORF = 'Dusseldorf',
}

export type LocationNameType = string[];
