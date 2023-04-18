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

export enum SortType {
  DEFAULT = 'Popular',
  LOW_TO_HIGHT = 'Price: low to high',
  HIGTH_TO_LOW = 'Price: high to low',
  RATING = 'Top rated first',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}


export enum APIRoute {
  Hotels = '/hotels',
  Login = '/login',
  Logout = '/logout',
}
