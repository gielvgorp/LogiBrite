import { format } from 'date-fns';
import { MOCK_ROUTES } from '../constants/MockData';

export const routeService = {
  getRoutes: async (): Promise<Route[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_ROUTES;
  },

  getRoutesByDate: async (date: string): Promise<Route[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_ROUTES.filter(route => route.date === date);
  },

getRoutesOfToDay: async (): Promise<Route[]> => {
    const today = format(new Date(), 'dd-MM-yyyy');

    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_ROUTES.filter(route => route.date === today);
  },

  getRouteById: async (routeId: number): Promise<Route | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_ROUTES.find(route => route.id === routeId);
  },

  getStops: async (routeId: number): Promise<RouteStop[] | undefined> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_ROUTES.find(route => route.id === routeId)?.stops;
  },

  getStopById: async (routeId: number, stopId: string): Promise<RouteStop | undefined> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_ROUTES.find(route => route.id === routeId)?.stops.find(stop => stop.id === stopId);
  },

  startRoute: async (routeId: number, startOdometer: number): Promise<Route> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const route = MOCK_ROUTES.find(r => r.id === routeId);
    
    if (!route) {
      throw new Error('Route not found');
    }
    
    route.status = 'in_progress';
    route.startOdometer = startOdometer;
    
    return route;
  },

  completeRoute: async (routeId: number, endOdometer: number, fuelAdded: number): Promise<Route> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const route = MOCK_ROUTES.find(r => r.id === routeId);
    
    if (!route) {
      throw new Error('Route not found');
    }
    
    route.status = 'completed';
    route.endOdometer = endOdometer;
    route.fuelAdded = fuelAdded;
    
    return route;
  },

  changeRouteIsLocked: async(routeId: number, value: boolean) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const route = MOCK_ROUTES.find(r => r.id === routeId);
    
    if (!route) {
      throw new Error('Route not found');
    }
    
    route.isLocked = value;
    return route;
  },

  completeStop: async (
    routeId: number, 
    stopId: string, 
    proofData: { photoUri?: string; notes?: string; }
  ): Promise<RouteStop> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const route = MOCK_ROUTES.find(r => r.id === routeId);
    
    if (!route) {
      throw new Error('Route not found');
    }
    
    const stop = route.stops.find(s => s.id === stopId);
    
    if (!stop) {
      throw new Error('Stop not found');
    }
    
    stop.isCompleted = true;
    stop.status = "Geleverd"
    stop.proofOfDelivery = {
      ...proofData,
      timestamp: new Date().toISOString()
    };
    
    return stop;
  },

  getNextStop: async (routeId: number): Promise<RouteStop | undefined> => {
     await new Promise(resolve => setTimeout(resolve, 300));
     return MOCK_ROUTES.find(r => r.id === routeId)?.stops.find(s => s.status === "In behandeling");
  },

getCoordinatesFromAddress: async (address: string, labelName?: string): Promise<Coordinates | undefined> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&q=${encodeURIComponent(address)}`,
    {
      headers: {
        'User-Agent': 'GielApp/1.0 (info@gielvgorp.nl)' // <- verplicht bij veel requests!
      }
    }
  );
  const data = await response.json();

  if (data.length > 0) {
    const result = data[0];

    return {
      latitude: parseFloat(result.lat),
      longitude: parseFloat(result.lon),
      title: labelName ?? address
    };
  } else {
    console.warn(`Adres niet gevonden: ${address}`);
    return undefined;
  }
}

};