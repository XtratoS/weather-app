interface Coord {
  lon: number;
  lat: number;
}

export interface City {
  id: number;
  name: string;
  state?: string;
  country: string;
  coord: Coord;
  fullName?: string;
}