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

export interface currentWeatherOpenWeatherAPIResponse {
  coord?: {
    lon: number;
    lat: number;
  };
  weather?: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base?: string;
  main?: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility?: number;
  wind?: {
    speed: number;
    deg: number;
  };
  clouds?: {
    all: number;
  };
  dt?: number;
  sys?: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone?: number;
  id?: number;
  name?: string;
  cod?: number;
}

let currentWeatherAPIResponseExample = {
  "coord": {
    "lon": 31.2497,
    "lat": 30.0626
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 306.88,
    "feels_like": 307.21,
    "temp_min": 306.16,
    "temp_max": 306.88,
    "pressure": 1007,
    "humidity": 36
  },
  "visibility": 10000,
  "wind": {
    "speed": 5.66,
    "deg": 300
  },
  "clouds": {
    "all": 0
  },
  "dt": 1627032810,
  "sys": {
    "type": 2,
    "id": 2037059,
    "country": "EG",
    "sunrise": 1627009701,
    "sunset": 1627059257
  },
  "timezone": 7200,
  "id": 360630,
  "name": "Cairo",
  "cod": 200
}