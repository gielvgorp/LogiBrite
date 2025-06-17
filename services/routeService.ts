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

createReport: async (
  routeId: number,
  stopId: string,
  note: string,
  items: ReportSelectedItem[]
): Promise<DeliveryReport> => {
  const stop = MOCK_ROUTES.find(route => route.id === routeId)
    ?.stops.find(stop => stop.id === stopId);

  if (!stop) throw new Error('Stop not found');

  const newReport: DeliveryReport = {
    id: Date.now(), // of een andere manier om uniek ID te genereren
    note,
    items,
  };

  stop.report = newReport;

  return newReport;
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
  }
};