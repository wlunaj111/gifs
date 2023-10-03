import { Region } from './region.type';
import { Country } from './country';

export interface CacheStore {
  byCapital: termCountries,
  byCountries: termCountries,
  byRegion: regionCountries,
}

export interface termCountries {
  term: string,
  countries: Country[];
}

export interface regionCountries {
  region?: Region,
  countries: Country[];
}
