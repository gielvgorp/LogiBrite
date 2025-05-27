interface StopListItem {
  title: string;
  status: 'In behandeling' | 'Geannuleerd' | 'Eerst volgende' | 'Geleverd';
  stopId?: string;
  stopIcon?: ReactNode;
  info?: StopListItemInfo;
  onPress: () => void;
  isLocked: boolean;
  arrivalTime: string;
}

interface StopListItemInfo {
  pallets?: number;
  rollerCart?: number;
  hasNote?: boolean;
}

interface StopListItemInfoItemProps {
  icon: ReactNode;
  name: string;
  value: string;
}

interface LoadingItem {
  stopId: number;
  customerName: string;
  address?: string;
  totalOverview?: boolean;
  items: DeliveryItems[];
}

interface RouteOfToday {
  id: number;
  routeName: string;
  routeDate: string;
  amountOfStops: number;
  routeTime: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface Route {
  id: number;
  driverId: number;
  name: string;
  startMileage: number;
  car: Car;
  date: any;
  depotLocation: string;
  stops: RouteStop[];
  status: string;
  startOdometer: number;
  endOdometer: number;
  fuelAdded: number;
  rollerCart: number;
  pallets: number;
  isLocked: boolean;
}

interface Car {
  id: number;
  type: string;
  licencePlate: string;
  model: string;
}

interface proofOfDelivery {
  photoUri?: string;
  notes?: string;
  timestamp: string;
}

interface RouteStop {
  id: string;
  stopNumber: number;
  scheduledTime: string;
  status: 'In behandeling' | 'Geannuleerd' | 'Eerst volgende' | 'Geleverd';
  deliveryNote: string;
  items: DeliveryItems[];
  customer: Customer;
  proofOfDelivery: proofOfDelivery;
  isCompleted: boolean;
}

interface Customer {
  id: number;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  phoneNumber: string;
}

interface DeliveryItems {
  id: number;
  itemName: string;
  quantity: number;
}

interface LoadingList {
  id: number
}