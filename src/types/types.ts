export type Location = {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
};

export type Current = {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
};

export type SearchCity = {
  cases: null;
  code: string;
  coordinates: { lon: number; lat: number };
  country_cases: null;
  country_code: number;
  country_name: number;
  index_strings: string[];
  main_airport_name: null;
  name: string;
  state_code: null;
  type: string;
  weight: number;
};

export type WeatherDataType = {
  location: Location;
  current: Current;
};
