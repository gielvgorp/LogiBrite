interface StopListItem {
  title: string;
  status: 'In behandeling' | 'Geannuleerd' | 'Eerst volgende' | 'Geleverd';
  stopId: string | ReactNode;
  info: StopListItemInfo;
  onPress: () => void;
}

interface StopListItemInfo {
  crates: number;
  pallets: number;
  rollerCart: number;
  hasNote: boolean;
}

interface StopListItemInfoItemProps {
  icon: ReactNode;
  name: string;
  value: string;
}

interface LoadingItem {
  stopId: string;
  customerName: string;
  address?: string;
  totalOverview?: boolean
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
  date: any;
  depotLocation: string;
  stops: RouteStop[];
}

interface RouteStop {
  id: string;
  stopNumber: number;
  scheduledTime: string;
  status: 'In behandeling' | 'Geannuleerd' | 'Eerst volgende' | 'Geleverd';
  deliveryNote: string;
  items: DeliveryItems[];
  customer: Customer;
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
  itemName: string;
  quantity: number;
}