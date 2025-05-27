import { MOCK_ROUTES, MOCK_USERS } from '../constants/MockData';

export const userService = {

    getDrivers: async (): Promise<User[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_USERS;
    },
    getDriverByID: async (id: number): Promise<User | undefined> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_USERS.find(u => u.id === id) ?? undefined;
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

  getDriverProfileStats: async (driverId: number): Promise<{
    totalKilometers: number;
    completedRoutes: number;
    completedStops: number;
  }> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const userRoutes = MOCK_ROUTES.filter(r => r.driverId === driverId);

    const completedRoutes = userRoutes.filter(r => r.status === "completed");

    const totalKilometers = completedRoutes.reduce((total, route) => {
      const distance = route.endOdometer && route.startOdometer
        ? route.endOdometer - route.startOdometer
        : 0;
      return total + distance;
    }, 0);

    const completedStops = userRoutes.reduce((total, route) => {
      const stops = route.stops ?? [];
      return total + stops.filter(s => s.isCompleted).length;
    }, 0);

    return {
      totalKilometers,
      completedRoutes: completedRoutes.length,
      completedStops
    };
}

};