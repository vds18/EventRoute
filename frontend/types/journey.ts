export interface RouteResult {
  distanceKm: number;
  durationMinutes: number;
  geometry: {
    type: string;
    coordinates: number[][];
  };
}