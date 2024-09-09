declare module 'nominatim-browser' {
  interface SearchOptions {
    q: string;
    format: string;
  }

  interface NominatimResult {
    lat: string;
    lon: string;
    display_name?: string;
    class?: string;
    type?: string;
    importance?: number;
    address?: {
      road?: string;
      city?: string;
      state?: string;
      country?: string;
      postcode?: string;
      [key: string]: any;
    };
    boundingbox?: [string, string, string, string];
    [key: string]: any;
  }

  function search(options: SearchOptions): Promise<NominatimResult[]>;

  export { search };
}
