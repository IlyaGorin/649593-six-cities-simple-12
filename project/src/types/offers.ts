export type CityLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  location: CityLocation;
  name: string;
}

export type Host = {
  avatarUrl: string;
  id: number;
  name: string;
  isPro: boolean;
}

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type Offer = {
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: Host;
  id: number;
  images: string[];
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
  isPremium: boolean;
}
