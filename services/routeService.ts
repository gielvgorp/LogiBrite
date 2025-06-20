
const baseURL = "http://192.168.178.14:5041/api";

export const routeService = {
  getRoutes: async (): Promise<Route[]> => {
    const response = await fetch(`${baseURL}/routes`);

    if (!response.ok) 
      throw new Error('Network response was not ok');

    return await response.json();
  },

  getRoutesByDate: async (date: string): Promise<Route[]> => {
    const response = await fetch(`${baseURL}/routes/date/${date}`);

    if (!response.ok) 
      throw new Error('Routes not found');

    return await response.json();
  },

  getRoutesOfToDay: async (): Promise<Route[]> => {
    const response = await fetch(`${baseURL}/routes/today`);

    if (!response.ok) 
      throw new Error('Routes not found');

    return await response.json();
  },

  getRouteById: async (routeId: number): Promise<Route> => {
    const response = await fetch(`${baseURL}/routes/${routeId}`);

    if (!response.ok) 
      throw new Error('Route not found');

    return await response.json();
  },

  getStops: async (routeId: number): Promise<RouteStop[]> => {
    const response = await fetch(`${baseURL}/routes/${routeId}/stops`);

    if (!response.ok) 
      throw new Error('Stops not found');

    return await response.json();
  },

  getReport: async (routeId: number, stopId: string): Promise<RouteStop[]> => {
    const response = await fetch(`${baseURL}/routes/${routeId}/stops/${stopId}/report`);

    if (!response.ok) 
      throw new Error('Stops not found');
    
    return await response.json();
  },

  getStopById: async (routeId: number, stopId: string): Promise<RouteStop> => {
    const response = await fetch(`${baseURL}/routes/${routeId}/stops/${stopId}`);

    if (!response.ok) 
      throw new Error('Stop not found');

    return await response.json();
  },

  startRoute: async (routeId: number, startOdometer: number): Promise<Route> => {
    const response = await fetch(`${baseURL}/routes/${routeId}/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ startOdometer })
    });

    if (!response.ok) 
      throw new Error('Start route failed');

    return await response.json();
  },

  completeRoute: async (routeId: number, endOdometer: number, fuelAdded: number): Promise<Route> => {
    const response = await fetch(`${baseURL}/routes/${routeId}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endOdometer, fuelAdded })
    });

    if (!response.ok) 
      throw new Error('Complete route failed');

    return await response.json();
  },

  completeStop: async (routeId: number, stopId: string, proofData: { photoUri?: string; notes?: string; timeStamp?: string }): Promise<RouteStop> => {
    const response = await fetch(`${baseURL}/routes/${routeId}/stops/${stopId}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(proofData)
    });

    if (!response.ok) 
      throw new Error('Complete stop failed');

    return await response.json();
  },

  createReport: async (routeId: number, stopId: string, note: string, items: ReportSelectedItem[]): Promise<DeliveryReport> => {
    const response = await fetch(`${baseURL}/routes/${routeId}/stops/${stopId}/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note, items })
    });

    if (!response.ok) 
      throw new Error('Create report failed');

    return await response.json();
  },

  changeRouteIsLocked: async (routeId: number, isLocked: boolean): Promise<Route> => {
    const response = await fetch(`${baseURL}/routes/${routeId}/lock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isLocked: isLocked })
    });

    if (!response.ok) 
      throw new Error('Change lock failed');

    return await response.json();
  },

 getNextStop: async (routeId: number): Promise<RouteStop | undefined> => {
    const response = await fetch(`${baseURL}/routes/${routeId}/next-stop`);

    if (!response.ok) 
      throw new Error('No next stop');

    const text = await response.text();

    if (!text || text.trim() === '') {
      return undefined; // Geen stop meer
    }

    const result = JSON.parse(text);
    return result;
  },


  getCoordinatesFromAddress: async (address: string, labelName?: string): Promise<Coordinates | undefined> => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&q=${encodeURIComponent(address)}`,
      { headers: { 'User-Agent': 'GielApp/1.0 (info@gielvgorp.nl)' } }
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
