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
  }
};